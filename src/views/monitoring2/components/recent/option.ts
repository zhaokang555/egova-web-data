export default {
    tooltip: {
        trigger: "axis"
    },
    legend: {
        right: "5%",
        top: "middle",
        orient: "vertical",
        data:["海康","大华","宇视","海信"]
    },
    grid: [
        {x: '5%', y: '20%', width: '80%', height: '60%'},
    ],
    xAxis: {
        type: "category",
        boundaryGap: false,
        axisTick: {
            show: false,
        },
        data: ["20180101","20180102","20180103","20180104","20180105","20180106","20180107"]
    },
    yAxis: {
        type: "value",
        axisTick: {
            show: false,
        },
        splitLine: {
            show: false,
        }
    },
    series: [
        {
            name:"海康",
            type:"line",
            stack: "总量",
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:"大华",
            type:"line",
            stack: "总量",
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:"宇视",
            type:"line",
            stack: "总量",
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:"海信",
            type:"line",
            stack: "总量",
            data:[320, 332, 301, 334, 390, 330, 320]
        },
    ]
};
