import { ChartType } from './dashboard.model';

const emailSentBarChart: ChartType = {


chart: {
    height: 350,
    type: 'bar',
    toolbar: {
        show: false
    }
},
plotOptions: {
    bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '45%',
    },
},
dataLabels: {
    enabled: false
},
stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
},
colors: ['#556ee6', '#f46a6a'],
series: [{
    name: 'Congé pris',
    data: [0,0,0,620,578,549,521,0,481,432,165,300,304]
}, {
    name: 'Solde congé',
    data: [25,25,1,163,1,134,112,50,52,51,-135,-270,29]
},

],
xaxis: {
    categories: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020','2021','2022'],
},

fill: {
    opacity: 1
},


};

const monthlyEarningChart: ChartType = {
    chart: {
        height: 200,
        type: 'radialBar',
        offsetY: -10
    },
    plotOptions: {
        radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
                name: {
                    fontSize: '13px',
                    color: undefined,
                    offsetY: 60
                },
                value: {
                    offsetY: 22,
                    fontSize: '16px',
                    color: undefined,
                    formatter: (val) => {
                        return val + '%';
                    }
                }
            }
        }
    },
    colors: ['#556ee6'],
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91]
        },
    },
    stroke: {
        dashArray: 4,
    },
    series: [67],
    labels: ['Series A'],
};

const transactions = [
    {
        id: '#SK2540',
        name: 'Neal Matthews',
        date: '07 Oct, 2019',
        total: '$400',
        status: 'Paid',
        payment: ['fa-cc-mastercard', 'Mastercard'],
        index: 1
    },
    {
        id: '#SK2541',
        name: 'Jamal Burnett',
        date: '07 Oct, 2019',
        total: '$380',
        status: 'Chargeback',
        payment: ['fa-cc-visa', 'Visa'],
        index: 2
    },
    {
        id: '#SK2542',
        name: 'Juan Mitchell',
        date: '06 Oct, 2019',
        total: '$384',
        status: 'Paid',
        payment: ['fab fa-cc-paypal', 'Paypal'],
        index: 3
    },
    {
        id: '#SK2543',
        name: 'Barry Dick',
        date: '05 Oct, 2019',
        total: '$412',
        status: 'Paid',
        payment: ['fa-cc-mastercard', 'Mastercard'],
        index: 4
    },
    {
        id: '#SK2544',
        name: 'Ronald Taylor',
        date: '04 Oct, 2019',
        total: '$404',
        status: 'Refund',
        payment: ['fa-cc-visa', 'Visa'],
        index: 5
    },
    {
        id: '#SK2545',
        name: 'Jacob Hunter',
        date: '04 Oct, 2019',
        total: '$392',
        status: 'Paid',
        payment: ['fab fa-cc-paypal', 'Paypal'],
        index: 6
    }
];

const statData = [{
    icon: 'bx bx-copy-alt',
    title: 'Orders',
    value: '1,235'
}, {
    icon: 'bx bx-archive-in',
    title: 'Revenue',
    value: '$35, 723'
}, {
    icon: 'bx bx-purchase-tag-alt',
    title: 'Average Price',
    value: '$16.2'
}];

export { emailSentBarChart, monthlyEarningChart, transactions, statData };
