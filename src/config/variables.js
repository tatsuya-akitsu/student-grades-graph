export const variables = {
  OPTIONS: {
    legend: {
      labels: {
        filter: (items) => {
          return (items.text = '')
        }
      }
    },
    tooltips: {
      mode: 'index',
      intersect: true,
      yPadding: 8,
      xPadding: 20,
      titleFontSize: 0,
      bodyFontSize: 16,
      bodyFontColor: '#354B4F',
      backgroundColor: '#fff',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#E1EBEB',
      cornerRadius: 5,
      displayColors: false
    },
    scales: {
      xAxes: [
        {
          display: true, // Y軸の表示
          ticks: {
            min: 0, // Y軸の最小値
            max: 5, // Y軸の最大値
            fontSize: 12, // Y軸のフォントサイズ
            fontColor: '#7BA0A6',
            stepSize: 1 // Y軸の間隔
          },
          gridLines: {
            color: '#E1EBEB'
          }
        }
      ],
      yAxes: [
        {
          position: 'right',
          ticks: {
            display: false,
            min: 0,
            max: 100,
            fontSize: 12,
            fontColor: '#7BA0A6',
            stepSize: 20
          },
          gridLines: {
            color: '#E1EBEB'
          }
        }
      ]
    }
  }
}
