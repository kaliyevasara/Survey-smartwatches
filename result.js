// ===== helper functions =====
function avg(arr) {
  const nums = arr.map(x => Number(x)).filter(x => !isNaN(x));
  if (!nums.length) return 0;
  return nums.reduce((a,b)=>a+b,0)/nums.length;
}

function countBy(data, field) {
  const map = {};
  data.forEach(r => {
    const v = r[field] ?? "Unknown";
    map[v] = (map[v] || 0) + 1;
  });
  return map;
}

function chartFromCountsOrdered(id, counts, order, labelName) {
  const labels = order.filter(k => counts[k] !== undefined);
  const values = labels.map(k => counts[k]);

  new Chart(document.getElementById(id), {
    type: 'bar',
    data: {
      labels,
      datasets: [{ label: labelName, data: values }]
    },
    options: { responsive: true }
  });
}

function chartFromCounts(id, counts, labelName) {
  new Chart(document.getElementById(id), {
    type: 'bar',
    data: {
      labels: Object.keys(counts),
      datasets: [{ label: labelName, data: Object.values(counts) }]
    },
    options: { responsive: true }
  });
}

// ===== load data =====
fetch('data.json')
  .then(r => r.json())
  .then(data => {

    document.getElementById('totalResponses').textContent = data.length;

    // ===== demographics =====

    chartFromCounts('genderChart', countBy(data,'Gender'), 'Respondents');
    chartFromCounts('ownChart', countBy(data,'OwnSmartwatch'), 'Respondents');

    // ---- AGE ORDER FIX ----
    const ageCounts = countBy(data,'Age');

    const ageOrder = [
      'under 20',
      '20–29',
      '20-29',
      '30–39',
      '30-39',
      '40–49',
      '40-49',
      '50–59',
      '50-59',
      '60 and over'
    ];

    chartFromCountsOrdered(
      'ageChart',
      ageCounts,
      ageOrder,
      'Respondents'
    );

    // ===== perception averages =====

    const watch3 = {
      Trust: avg(data.map(d=>d.Watch3_Trust)),
      Accuracy: avg(data.map(d=>d.Watch3_Accuracy)),
      Innov: avg(data.map(d=>d.Watch3_Innov))
    };

    const watch8 = {
      Trust: avg(data.map(d=>d.Watch8_Trust)),
      Accuracy: avg(data.map(d=>d.Watch8_Accuracy)),
      Innov: avg(data.map(d=>d.Watch8_Innov))
    };

    new Chart(document.getElementById('watchCompareChart'), {
      type: 'bar',
      data: {
        labels: ['Trust','Accuracy','Innovativeness'],
        datasets: [
          { label: 'Watch 3', data: [watch3.Trust, watch3.Accuracy, watch3.Innov] },
          { label: 'Watch 8 AI', data: [watch8.Trust, watch8.Accuracy, watch8.Innov] }
        ]
      }
    });

    // ===== WTP attitudes =====

    const wtp = {
      UnderstandAI: avg(data.map(d=>d.WTP_UnderstandAI)),
      PayExtra: avg(data.map(d=>d.WTP_AIExtra)),
      AdvancedAI: avg(data.map(d=>d.WTP_AdvancedAI)),
      LongTermValue: avg(data.map(d=>d.WTP_LongTermValue))
    };

    new Chart(document.getElementById('wtpAttitudeChart'), {
      type: 'radar',
      data: {
        labels: Object.keys(wtp),
        datasets: [{
          label: 'WTP Attitude Score',
          data: Object.values(wtp)
        }]
      }
    });

    // ===== WTP % ORDER FIX =====

    const pctCounts = countBy(data,'ExtraPayPct');

    const pctOrder = [
      '0%',
      'Up to 10% more',
      'Up to 20% more',
      'Up to 30% more',
      'Up to 40% more',
      'Up to 50% more',
      'More than 50% more'
    ];

    chartFromCountsOrdered(
      'extraPctChart',
      pctCounts,
      pctOrder,
      'Responses'
    );

    // ===== choice =====

    chartFromCounts('choiceChart', countBy(data,'Choice'), 'Responses');

    // ===== prices =====

    const p3 = avg(data.map(d=>d.MaxPriceWatch3));
    const p8 = avg(data.map(d=>d.MaxPriceWatch8));

    new Chart(document.getElementById('priceChart'), {
      type: 'bar',
      data: {
        labels: ['Watch 3','Watch 8 AI'],
        datasets: [{
          label: 'Average Max Price (CZK)',
          data: [p3, p8]
        }]
      }
    });

    // ===== factors =====

    const factors = {
      BrandTrust: avg(data.map(d=>d.BrandTrust)),
      Guarantee: avg(data.map(d=>d.Guarantee)),
      AIValue: avg(data.map(d=>d.AIValue)),
      IntendedUse: avg(data.map(d=>d.IntendedUse))
    };

    new Chart(document.getElementById('factorsChart'), {
      type: 'bar',
      data: {
        labels: Object.keys(factors),
        datasets: [{
          label: 'Average Influence Score',
          data: Object.values(factors)
        }]
      }
    });

  })
  .catch(err => {
    console.error(err);
    alert('Cannot load data.json — check file path and format');
  });
