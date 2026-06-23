const url = "https://bcbwmvzxgrawjqpxesdi.supabase.co/storage/v1/object/public/Portfolio/edit_stage_1.png";
fetch(url).then(res => {
  console.log("Status:", res.status);
  return res.text();
}).then(text => {
  console.log("Body:", text.slice(0, 100));
}).catch(console.error);
