const { getCollection } = require("../_lib/mongodb");
const valid = s => /^\d{4}-\d{2}-\d{2}$/.test(s || "");
module.exports = async (req,res) => {
  res.setHeader("Cache-Control","no-store");
  if(req.method!=="GET") return res.status(405).json({error:"Method not allowed"});
  const {from,to}=req.query||{};
  if(!valid(from)||!valid(to)||from>to) return res.status(400).json({error:"Use valid from/to dates: YYYY-MM-DD"});
  try {
    const c=await getCollection();
    const records=await c.find({date:{$gte:from,$lte:to}}).sort({date:-1}).toArray();
    res.status(200).json({records});
  } catch(e){console.error(e);res.status(500).json({error:"Database error"});}
};
