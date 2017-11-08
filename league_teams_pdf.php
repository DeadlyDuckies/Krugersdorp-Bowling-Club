<?php
    define('FPDF_FONTPATH','extensions/fpdf181/font/');
    require('extensions/fpdf181/fpdf.php');

    $pdf = new FPDF();
    $pdf->SetFont('Arial', 'B', 24);
    $pdf->SetMargins(25.4, 25.4);
    $pdf->AddPage('P', 'A4');
    $pdf->Cell(0, 8, getTitle(), 0, 1, 'C', false);
    $pdf->SetFont('Arial', 'I', 12);
    $pdf->Cell(0, 15, getTitleDate(), 0, 1, 'C', false);
    $pdf->SetFont('Arial', '', 12);
    $pdf->SetTextColor(96,96,96);
    $pdf->Cell(0, 10, 'Men', 0, 1, 'C', false);
    $pdf->Cell(0, 10, getTeams('men'), 0, 1, 'C', false);

    $pdf->Output();

    function getInfo() {
        $xml=simplexml_load_file("config/league_teams.xml") or die("Error: Cannot create object");
        return json_decode( json_encode($xml) , 1);
    }

    function getTitle() {
        return getInfo()["title"];
    }

    function getTitleDate() {
        return getInfo()["date"];
    }

    function getTeams($type) {
        $array=getInfo();
        $division_heading=$array[$type]["team"][0]["division_type"] . ' - Division ' . $array[$type]["team"][0]["division_no"];
        $team_heading='Krugersdorp ' . '1';

        $table='<table>';
        $table.='<thead>';
        $table.='<tr>';
        $table.='<th>' . $division_heading . '</th>';
        $table.='<th>' . $team_heading . '</th>';
        $table.='</tr>';
        $table.='</thead>';
        $table.='</table>';

        return $table;
    }