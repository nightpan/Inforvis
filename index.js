d3.csv("./James.csv",function(data){
  console.log(data);
  NBA();
});
function NBA(){
// 图表的宽度和高度
var width = 600;
var height = 600;
// 预留给轴线的距离
var padding = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

var dataset = [
  [1, 224],
  [2, 528],
  [3, 756],
  [4, 632],
  [5, 582],
  [6, 704],
  [7, 766],
  [8, 804],
  [9, 884],
  [10, 960],
  [11, 1095],
  [12, 1250]
];

var min = d3.min(dataset, function (d) {
  return d[1];
})
var max = d3.max(dataset, function (d) {
  return d[1];
})

var xScale = d3.scaleLinear()
  .domain([1, 12])
  .range([0, width - padding.left - padding.right]);

var yScale = d3.scaleLinear()
  .domain([0, max])
  .range([height - padding.top - padding.bottom, 0]);

var svg = d3.select('body')
  .append('svg')
  .attr('width', width + 'px')
  .attr('height', height + 'px');

var xAxis = d3.axisBottom()
  .scale(xScale);

var yAxis = d3.axisLeft()
  .scale(yScale);

svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(' + padding.left + ',' + (height - padding.bottom) + ')')
  .call(xAxis);

svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
  .call(yAxis);

var linePath = d3.line()
  .x(function (d) {
    return xScale(d[0])
  })
  .y(function (d) {
    return yScale(d[1])
  });

svg.append('g')
  .append('path')
  .attr('class', 'line-path')
  .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
  .attr('d', linePath(dataset))
  .attr('fill', 'none')
  .attr('stroke-width', 3)
  .attr('stroke', 'blue');

svg.append('g')
  .selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('r', 5)
  .attr('transform', function (d) {
    return 'translate(' + (xScale(d[0]) + padding.left) + ',' + (yScale(d[1]) + padding.top) + ')'
  })
  .attr('fill', 'blue');
}