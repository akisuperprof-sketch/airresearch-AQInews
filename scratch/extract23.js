const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('scratch/tokyo.geojson', 'utf8'));
  const wards = [
    '千代田区', '中央区', '港区', '新宿区', '文京区', '台東区', '墨田区', '江東区', 
    '品川区', '目黒区', '大田区', '世田谷区', '渋谷区', '中野区', '杉並区', '豊島区', 
    '北区', '荒川区', '板橋区', '練馬区', '足立区', '葛飾区', '江戸川区'
  ];

  const features = data.features.filter(f => {
    // Check various common properties for the ward name
    const props = f.properties || {};
    const nameStr = JSON.stringify(props);
    return wards.some(ward => nameStr.includes(ward));
  });

  console.log(`Found ${features.length} features matching the 23 wards.`);
  
  if (features.length > 0) {
    data.features = features;
    fs.writeFileSync('scratch/tokyo23.geojson', JSON.stringify(data));
    console.log('Saved to scratch/tokyo23.geojson');
  } else {
    // print out sample properties
    console.log("Sample properties:", data.features[0].properties);
  }
} catch (e) {
  console.error(e);
}
