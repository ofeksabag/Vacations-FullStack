import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../../../Assets/lib/canvasjs.react';
import ReportModel from '../../../Models/ReportModel';
import adminService from '../../../Services/AdminService';
import { CSVLink, CSVDownload } from "react-csv";
import notify from '../../../Utils/Notify';

const Report = () => {

    const [followers, setFollowers] = useState<ReportModel[]>([]);

    const csvData = [
        ["Destination", "Followers"]
    ];

    useEffect(() => {
        adminService.getVacationsReport()
            .then(f => {
                setFollowers(f);
            })
            .catch(err => notify.error(err.message));
    }, []);

    const CanvasJS = CanvasJSReact.CanvasJS;
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const options = {
        animationEnabled: true,
        title: {
            text: "Vacations Report"
        },
        axisY: {
            title: "Followers",
            scaleBreaks: {
                type: "wavy",
                lineColor: "black"
            }
        },
        data: [] as {dataPoints: {label: string, y: number}[]}[]
    };

    for(let item = 0; item < followers.length; item++) {
        const dataPoints: {label: string, y: number}[] = [];
        const csvItem: any = [followers[item].destination, followers[item].followersCount];
        dataPoints.push({label: followers[item].destination, y: followers[item].followersCount});

        const itemObj = {
            type: "column",
            name: "{label}",
            showInLegend: true,
            indexLabel: "{y}",
            dataPoints: dataPoints
        };

        csvData.push(csvItem);
        options.data.push(itemObj);
    }

    return (
        <div>
            <CanvasJSChart options={options} />
            <br />
            <hr />
            <br />
            <CSVLink data={csvData} filename={"report.csv"}>
                <button className="Btn">Download as .CSV (Excel file)</button>
            </CSVLink>
        </div>
    );
}

export default Report;