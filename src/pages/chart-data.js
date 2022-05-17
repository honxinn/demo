import { getDay } from "../utils"
export const getUserNumByAllCampus = {
  series: [ {
    name: '发帖数',
    data: [11, 32, 45, 32, 34, 52, 41]
  }],
  chartOptions: {
    chart: {
      toolbar: false,
      height: 500,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    title: {
      text: '近七天文章增长趋势',
      align: 'left'
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: [getDay(-6) + ' 00:00:00', getDay(-5) + ' 00:00:00', getDay(-4) + ' 00:00:00', getDay(-3) + ' 00:00:00', getDay(-2) + ' 00:00:00', getDay(-1) + ' 00:00:00', getDay(0) + ' 00:00:00']
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
  },
}

export const getArticleNumByAllCampus = {
  series: [{
    name: '交易量',
    data: [10, 15, 8, 15, 7, 12, 8],
  }],
  chartOptions: {
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    chart: {
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2.5,
    },
    colors: ['#FF9F43'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.9,
        opacityFrom: 0.7,
        opacityTo: 0.5,
        stops: [0, 80, 100],
      },
    },
    xaxis: {
      type: 'numeric',
      lines: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        show: false
      },
    },
    yaxis: [{
      y: 0,
      offsetX: 0,
      offsetY: 0,
      padding: {
        left: 0,
        right: 0
      },
    }],
    tooltip: {
      x: {
        show: false
      },
      y: {
        show: false
      }
    },
  },
}