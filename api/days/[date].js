const { getCollection } = require("../_lib/mongodb");
const valid = s => /^\d{4}-\d{2}-\d{2}$/.test(s || "");
function person(x={}) {
  const rating=Number(x.rating??0), water=Number(x.waterAmount??0);
  return {
    breakfast:String(x.breakfast??"").trim().slice(0,5000),
    morningSnacks:String(x.morningSnacks??"").trim().slice(0,5000),
    lunch:String(x.lunch??"").trim().slice(0,5000),
    eveningSnacks:String(x.eveningSnacks??"").trim().slice(0,5000),
    dinner:String(x.dinner??"").trim().slice(0,5000),
    fruit:String(x.fruit??"").trim().slice(0,1000),
    waterAmount:Number.isFinite(water)&&water>=0?Math.min(water,1000):0,
    waterUnit:x.waterUnit==="glasses"?"glasses":"litres",
    rating:Number.isFinite(rating)&&rating>=0?Math.min(rating,10):0,
    note:String(x.note??"").trim().slice(0,10000)
  };
}
module.exports=async(req,res)=>{
  res.setHeader("Cache-Control","no-store");
  const date=req.query?.date;
  if(!valid(date)) return res.status(400).json({error:"Invalid date"});
  try {
    const c=await getCollection();
    if(req.method==="GET"){const record=await c.findOne({date});return res.status(200).json({exists:!!record,record:record||null});}
    if(req.method==="PUT"){
      const doc={date,manya:person(req.body?.manya),vikash:person(req.body?.vikash),updatedAt:new Date()};
      await c.updateOne({date},{$set:doc,$setOnInsert:{createdAt:new Date()}},{upsert:true});
      return res.status(200).json({ok:true,record:doc});
    }
    if(req.method==="DELETE"){const r=await c.deleteOne({date});return res.status(200).json({ok:true,deleted:r.deletedCount>0});}
    res.setHeader("Allow","GET, PUT, DELETE");res.status(405).json({error:"Method not allowed"});
  } catch(e){console.error(e);res.status(500).json({error:"Database error"});}
};
