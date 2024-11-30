import React, { useRef, useEffect, useState } from 'react';

import { chartColors } from './ChartjsConfig';
import { Box } from '@mui/material';
import {
  Chart, LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

// Import utilities
import { tailwindConfig, formatValue } from '../utils';

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip);

function LineChart02({
  data,
  width,
  height
}) {

  const [chart, setChart] = useState(null)
  const canvas = useRef(null);
  const legend = useRef(null);
  const darkMode = 'light';
  const currentTheme = 'light';
  const { textColor, gridColor, tooltipBodyColor, tooltipBgColor, tooltipBorderColor } = chartColors;

  useEffect(() => {
    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const newChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        layout: {
          padding: 20,
        },
        scales: {
          y: {
            border: {
              display: false,
            },
            beginAtZero: true,
            ticks: {
              // maxTicksLimit: 5,
              callback: (value) => formatValue(value),
              color: darkMode ? textColor.dark : textColor.light,
            },
            grid: {
              color: '#ECECEC',
            },
          },
          x: {
            type: 'time',
            time: {
              parser: 'MM-dd-yyyy',
              unit: 'month',
              displayFormats: {
                month: 'MMM yy',
              },
            },
            border: {
              display: false,
            },
            grid: {
              color: '#ECECEC',
            },
            ticks: {
              autoSkipPadding: 48,
              maxRotation: 0,
              color: darkMode ? textColor.dark : textColor.light,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: () => false, // Disable tooltip title
              label: (context) => formatValue(context.parsed.y),
            },
            bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
            backgroundColor: darkMode ? tooltipBgColor.dark : tooltipBgColor.light,
            borderColor: darkMode ? tooltipBorderColor.dark : tooltipBorderColor.light,
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
      plugins: [
        {
          id: 'htmlLegend',
          afterUpdate(c, args, options) {
            const ul = legend.current;
            if (!ul) return;
            // Remove old legend items
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
            // Reuse the built-in legendItems generator
            const items = c.options.plugins.legend.labels.generateLabels(c);
            items.forEach((item) => {

              const li = document.createElement('li');
              li.classList.add('graph-label-list');
              // li.style.margin = tailwindConfig().theme.margin[1];
              // Button element
              const button = document.createElement('button');
              button.classList.add('btn-xs', 'bg-white', 'dark:bg-slate-800', 'text-slate-500', 'dark:text-slate-400', 'border', 'border-slate-200', 'dark:border-slate-700', 'shadow-md');
              button.style.opacity = item.hidden ? '.3' : '';
              button.style.display = 'flex';
              button.style.alignItems = 'center';
              button.style.backgroundColor = 'transparent'
              button.style.border = 'none'
              button.onclick = () => {
                c.toggleDataVisibility(item.index);
                c.update();
              };
              // Color box
              const box = document.createElement('span');
              box.style.display = 'block';
              box.style.backgroundColor = item.strokeStyle
              box.style.width = '21px';
              box.style.height = '8px';

              box.style.pointerEvents = 'none';
              // Label
              const label = document.createElement('span');
              button.classList.add('graph-label');
              label.style.display = 'flex';
              label.style.margin = '0px 0px 0px 6px';
              label.style.alignItems = 'center';
              const labelText = document.createTextNode(item.text);
              label.appendChild(labelText);
              li.appendChild(button);
              button.appendChild(box);
              button.appendChild(label);
              ul.appendChild(li);
            });
          },
        },
      ],
    });
    setChart(newChart);
    return () => newChart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!chart) return;

    if (darkMode) {
      chart.options.scales.x.ticks.color = textColor.dark;
      chart.options.scales.y.ticks.color = textColor.dark;
      chart.options.scales.y.grid.color = gridColor.dark;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
    } else {
      chart.options.scales.x.ticks.color = textColor.light;
      chart.options.scales.y.ticks.color = textColor.light;
      chart.options.scales.y.grid.color = gridColor.light;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
    }
    chart.update('none');
  }, [currentTheme]);

  return (
    <React.Fragment>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', ml: 3, mt: 2 }}>
        <ul ref={legend} className="graph-label-ul"></ul>
      </Box>
    </React.Fragment>
  );
}

export default LineChart02;