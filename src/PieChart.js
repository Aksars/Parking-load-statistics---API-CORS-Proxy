
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import "./PieChart.css"

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ data }) {

    const options = {
        
        layout: {
            padding:  {              
                right: 35, 
                    
            },
        },
        plugins: {
            tooltip: {
                titleFont: {
                    size: 15
                },
                bodyFont: {
                    size: 15
                },
                padding: 15,
            },
            legend: {
                display: true,
                responsive: true,
                position: "left",
                labels: {
                    boxWidth: 36,
                    padding: 35,
                    font: {
                        size: 17
                    },
                },
                align: "center",
            },
        }        
    }

    const chartData = {
            labels: data.map(item => item.District),
            datasets: [
                {
                    data: data.map(item => item.Capacity),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                }
            ]
        };

        // Добавляем отступ к ленегде, справа
        const plugin = {
            beforeInit: function (chart) {
              // Get reference to the original fit function
              const originalFit = chart.legend.fit
          
              // Override the fit function
              chart.legend.fit = function fit() {
                // Bind scope in order to use `this` correctly inside it
                originalFit.bind(chart.legend)()
                this.width += 35 // Change the width
              }
            }
          }

        return( 
        <div className = 'pie-chart-container' >
                <Pie  data={chartData} options={options} plugins={[plugin]} />
        </div >
    )
}