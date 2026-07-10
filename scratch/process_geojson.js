const fs = require('fs');
const { execSync } = require('child_process');

try {
  // 1. Load original data
  const originalFile = 'scratch/tokyo.geojson';
  const originalStat = fs.statSync(originalFile);
  const data = JSON.parse(fs.readFileSync(originalFile, 'utf8'));
  
  const targetWards = [
    '千代田区', '中央区', '港区', '新宿区', '文京区', '台東区', '墨田区', '江東区', 
    '品川区', '目黒区', '大田区', '世田谷区', '渋谷区', '中野区', '杉並区', '豊島区', 
    '北区', '荒川区', '板橋区', '練馬区', '足立区', '葛飾区', '江戸川区'
  ];

  // 2. Filter 23 wards precisely
  const filteredFeatures = data.features.filter(f => {
    return f.properties && f.properties.ward_ja && targetWards.includes(f.properties.ward_ja);
  });

  const tempFile = 'scratch/tokyo_23_filtered_temp.geojson';
  data.features = filteredFeatures;
  fs.writeFileSync(tempFile, JSON.stringify(data));
  
  const filteredWards = filteredFeatures.map(f => f.properties.ward_ja);
  const missing = targetWards.filter(w => !filteredWards.includes(w));
  
  // 3. Simplify with mapshaper (if available) or rely on the filtered size
  let finalFile = 'public/data/tokyo23.geojson';
  try {
    // try to simplify 20%
    execSync(`npx mapshaper ${tempFile} -simplify 20% -o ${finalFile}`, { stdio: 'pipe' });
  } catch(e) {
    console.log('Mapshaper failed or not installed properly, using unsimplified filtered data.');
    fs.copyFileSync(tempFile, finalFile);
  }

  // 4. Report
  const finalStat = fs.statSync(finalFile);
  
  console.log("=== Extraction Report ===");
  console.log("Original Source: tokyo.geojson (dataofjapan)");
  console.log("Schema:", Object.keys(data.features[0].properties).join(', '));
  console.log("Ward Field: ward_ja");
  console.log("Extracted Features:", filteredFeatures.length);
  console.log("Extracted Wards:", filteredWards.join(', '));
  console.log("Missing Wards:", missing.length === 0 ? "None" : missing.join(', '));
  console.log("Original Size:", (originalStat.size / 1024 / 1024).toFixed(2) + " MB");
  console.log("Filtered Size:", (fs.statSync(tempFile).size / 1024).toFixed(2) + " KB");
  console.log("Final (Simplified) Size:", (finalStat.size / 1024).toFixed(2) + " KB");

} catch (e) {
  console.error(e);
}
