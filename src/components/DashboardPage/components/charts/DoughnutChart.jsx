import React, { useRef, useEffect, useState } from 'react';


import { chartColors } from './ChartjsConfig';
import {
  Chart, DoughnutController, ArcElement, TimeScale, Tooltip,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

// Import utilities
import { tailwindConfig } from '../utils';
import { Stack, Box } from '@mui/material';

Chart.register(DoughnutController, ArcElement, TimeScale, Tooltip);

function DoughnutChart({
  data,
  width,
  height
}) {

  const [chart, setChart] = useState(null)
  const canvas = useRef(null);
  const legend = useRef(null);
  const darkMode = 'light';
  const currentTheme = 'light';
  const { tooltipTitleColor, tooltipBodyColor, tooltipBgColor, tooltipBorderColor } = chartColors;

  useEffect(() => {
    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const newChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        borderRadius: 10,
        hoverOffset: 60,
        cutout: '70%',
        // hoverOffset: '2px',
        layout: {
          padding: 4,
        },
        hover: {
          cutout: '90%',
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            titleColor: darkMode ? tooltipTitleColor.dark : tooltipTitleColor.light,
            bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
            backgroundColor: darkMode ? tooltipBgColor.dark : tooltipBgColor.light,
            borderColor: darkMode ? tooltipBorderColor.dark : tooltipBorderColor.light,
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        animation: {
          duration: 500,
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
              li.classList.add('donut-graph-label-list');
              // li.style.margin = tailwindConfig().theme.margin[1];


              // Button element
              const button = document.createElement('button');
              // button.classList.add('btn-xs', 'bg-white', 'dark:bg-slate-800', 'text-slate-500', 'dark:text-slate-400', 'border', 'border-slate-200', 'dark:border-slate-700', 'shadow-md');
              button.style.opacity = item.hidden ? '.3' : '';
              button.style.display = 'flex';
              button.style.alignItems = 'center';
              button.style.backgroundColor = 'white'
              button.style.border = 'none'
              button.onclick = () => {
                c.toggleDataVisibility(item.index);
                c.update();
              };


              // Color box
              const box = document.createElement('div');
              box.style.display = 'block';
              box.style.backgroundColor = item.fillStyle
              box.style.width = '14.22px';
              box.style.height = '14.22px';
              box.style.borderRadius = '24px';
              box.style.pointerEvents = 'none';

              // Label
              const label = document.createElement('div');
              label.classList.add('donut-graph-label');
              label.style.display = 'flex';
              label.style.margin = '0px 0px 0px 6px';
              label.style.alignItems = 'center';
              const labelText = document.createTextNode(item.text);

              // subLabel
              const subLabel = document.createElement('div');
              // subLabel.classList.add('donut-graph-label');
              subLabel.style.display = 'flex';
              subLabel.style.width = '30px';
              subLabel.style.alignItems = 'center';
              const subLabelText = document.createTextNode(data.datasets[0].data[item.index]);

              label.appendChild(labelText);
              li.appendChild(button);
              li.appendChild(subLabelText);
              button.appendChild(box);
              button.appendChild(label);
              button.appendChild(subLabel);
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
      chart.options.plugins.tooltip.titleColor = tooltipTitleColor.dark;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
    } else {
      chart.options.plugins.tooltip.titleColor = tooltipTitleColor.light;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
    }
    chart.update('none');
  }, [currentTheme]);

  return (
    <React.Fragment>
      <Box height={'100%'} display={'flex'} width={'100%'} flexDirection={{ xs: 'column', md: 'row' }} justifyContent={'space-between'} alignItems={'center'}>
        <Box className="grow" height={'100%'} width={{ xs: '80%', md: 'calc( 100% - 231.36px )' }}>
          <canvas ref={canvas} width={width} height={height}></canvas>
        </Box>
        <Box width={{ xs: '100%', md: '231.36px' }}>
          <ul ref={legend} className="donut-graph-label-ul"></ul>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default DoughnutChart;