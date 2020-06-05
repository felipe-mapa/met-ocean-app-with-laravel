import * as React from "react";
import {
  VictoryTheme,
  VictoryChart,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryTooltip,
  VictoryScatter,
  VictoryLine,
  VictoryBrushContainer,
  VictoryArea,
} from "victory";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { eachDayOfInterval, format } from "date-fns";

import { Colors } from "../Layout/Colors";
import { Typography } from "@material-ui/core";

const DataChart = (props) => {
  // get selectors from store
  const hourlyData = useSelector(
    (state) => state.metocean.hourlyData
  );
  const columns = useSelector(
    (state) => state.metocean.columns
  );

  // set inicial states
  const [dataSelected, setDataSelected] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState();
  const [measurement, setMeasurement] = useState();
  const [zoomValues, setZoomValue] = useState([]);

  // update chart value
  useEffect(() => {
    // set selected column data
    const newData = hourlyData.map((data) => {
      const y = data.time.slice(0, 4);
      const m = data.time.slice(5, 7);
      const d = data.time.slice(8, 10);
      const h = data.time.slice(11, 13);

      return {
        x: new Date(y, m, d, h),
        y: data[props.ySelected] * 100,
      };
    });
    setDataSelected(newData);

    // set measurement of selected column
    const newMeasurement = columns.find((c) => c.name === props.ySelected)
      .measurement;
    setMeasurement(newMeasurement);
  }, [props.ySelected, columns, hourlyData]);

  // set X axis dates for Bottom chart
  useEffect(() => {
    if (dataSelected.length > 0) {
      const newZoomValue = eachDayOfInterval({
        start: dataSelected.map((date) => date.x)[0],
        end: dataSelected.map((date) => date.x)[dataSelected.length - 1],
      });
      setZoomValue(newZoomValue);
    }
  }, [dataSelected]);

  return (
    <React.Fragment>
      {/* TOP CHART */}
      <Typography variant="h6">Main Chart</Typography>
      <VictoryChart
        theme={VictoryTheme.material}
        width={550}
        height={250}
        padding={{ left: 80, top: 20, right: 20, bottom: 50 }}
        domainPadding={{ y: 10, x: 10 }}
        style={{ parent: { width: "90%", margin: "0 auto" } }}
        scale={{ x: "time" }}
        containerComponent={
          <VictoryZoomContainer
            responsive={true}
            zoomDimension="x"
            downsample
            zoomDomain={selectedDomain}
            onZoomDomainChange={(domain) => setSelectedDomain(domain)}
          />
        }
      >
        {/* X axis */}
        <VictoryAxis />
        {/* Y axis */}
        <VictoryAxis
          dependentAxis
          tickFormat={(y) => `${y / 100} ${measurement}`}
        />
        {/* lines */}
        <VictoryLine
          style={{
            data: { stroke: Colors.secondary },
          }}
          data={dataSelected}
        />
        {/* dots */}
        <VictoryScatter
          size={3}
          labels={({ datum }) => {
            const data = parseFloat(datum.y) / 100;
            const date = format(datum.x, "PPp");

            return `${data} ${measurement} \n ${date}`;
          }}
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      target: "data",
                      mutation: (props) => {
                        const fill = props.style && props.style.fill;
                        return fill === Colors.primary
                          ? null
                          : { style: { fill: Colors.primary } };
                      },
                    },
                  ];
                },
              },
            },
          ]}
          labelComponent={<VictoryTooltip />}
          data={dataSelected}
        />
      </VictoryChart>

      {/* BOTTOM CHART */}
      <Typography variant="h6">Support Chart</Typography>
      <VictoryChart
        width={600}
        height={90}
        scale={{ x: "time" }}
        style={{ parent: { width: "90%", margin: "0 auto" } }}
        padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
        domainPadding={{ y: 10 }}
        containerComponent={
          <VictoryBrushContainer
            responsive={true}
            brushDimension="x"
            brushDomain={selectedDomain}
            onBrushDomainChange={(domain) => setSelectedDomain(domain)}
          />
        }
      >
        {/* X axis */}
        <VictoryAxis
          tickValues={zoomValues}
          tickFormat={(x) =>
            `${new Date(x).getDate()}/${new Date(x).getMonth()}/${new Date(x)
              .getFullYear()
              .toString()
              .substr(-2)}`
          }
        />
        {/* filled chart */}
        <VictoryArea
          style={{
            data: { stroke: Colors.primary, fill: Colors.primary },
          }}
          data={dataSelected}
        />
      </VictoryChart>
    </React.Fragment>
  );
};

export default DataChart;
