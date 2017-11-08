<?php
    date_default_timezone_set('Africa/Johannesburg');

    // include PHPExcel library and set its path accordingly.
    require('extensions/phpexcel/PHPExcel.php');

    $xml=simplexml_load_file("config/league_teams.xml") or die("Error: Cannot create object");
    $league_array=json_decode( json_encode($xml) , 1);

    $objPHPExcel = new PHPExcel;
    $objPHPExcel->getDefaultStyle()->getFont()->setName('Calibri');
    $objPHPExcel->getDefaultStyle()->getFont()->setSize(14);
    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, "Excel2007");

    $currencyFormat = '#,#0.## \;[Red]-#,#0.## \'';
    $numberFormat = '#,#0.##;[Red]-#,#0.##';

    $objSheet = $objPHPExcel->getActiveSheet();
    populateSheet($objSheet, $league_array, 'mens');

    $objWorkSheet = $objPHPExcel->createSheet(1);
    $objPHPExcel->setActiveSheetIndex(1);

    $objSheet = $objPHPExcel->getActiveSheet();
    populateSheet($objSheet, $league_array, 'ladies');

    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="league_teams.xlsx"');
    header('Cache-Control: max-age=0');

    $objWriter->save('php://output');

    function columnWidth($columnWidth) {
        return $columnWidth * 4;
    }

    function rowHeight($rowHeight) {
        return $rowHeight / 0.035;
    }

    function cellReference($x, $y, $start) {
        $row=$start+$y;
        return $x . $row;
    }

    function populateSheet($objSheet, $league_array, $type) {
        $objSheet->setTitle(strtoupper($type) . ' League Teams');

        //Column Dimensions
        $objSheet->getColumnDimension('A')->setAutoSize(false);
        $objSheet->getColumnDimension('A')->setWidth(columnWidth(2.18));
        $objSheet->getColumnDimension('B')->setWidth(columnWidth(1.54));
        $objSheet->getColumnDimension('C')->setWidth(columnWidth(4.23));
        $objSheet->getColumnDimension('D')->setWidth(columnWidth(0.53));
        $objSheet->getColumnDimension('E')->setWidth(columnWidth(4.23));
        $objSheet->getColumnDimension('F')->setWidth(columnWidth(0.53));
        $objSheet->getColumnDimension('G')->setWidth(columnWidth(4.23));
        $objSheet->getColumnDimension('H')->setWidth(columnWidth(0.53));
        $objSheet->getColumnDimension('I')->setWidth(columnWidth(4.23));
        $objSheet->getColumnDimension('J')->setWidth(columnWidth(0.53));
        $objSheet->getColumnDimension('K')->setWidth(columnWidth(1.70));
        $objSheet->getColumnDimension('L')->setWidth(columnWidth(2.60));
        $objSheet->getColumnDimension('M')->setWidth(columnWidth(3.22));
        $objSheet->getColumnDimension('N')->setWidth(columnWidth(1.70));

        $objSheet->getColumnDimension('C')->setAutoSize(true);
        $objSheet->getColumnDimension('E')->setAutoSize(true);
        $objSheet->getColumnDimension('G')->setAutoSize(true);
        $objSheet->getColumnDimension('I')->setAutoSize(true);

        //Row Dimensions
        $objSheet->getRowDimension(1)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(2)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(3)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(4)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(5)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(6)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(7)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(8)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(9)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(10)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(11)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(12)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(13)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(14)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(15)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(16)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(17)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(18)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(19)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(20)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(21)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(22)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(23)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(24)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(25)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(26)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(27)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(28)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(29)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(30)->setRowHeight(rowHeight(0.66));
        $objSheet->getRowDimension(31)->setRowHeight(rowHeight(0.66));

        //Heading
        $objSheet->getStyle('A1:N1')->getFont()->setBold(true);
        $objSheet->getStyle('A1:N1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $objSheet->mergeCells('A1:N1');
        $objSheet->getCell('A1')->setValue('KRUGERSDORP BOWLING CLUB - ' . strtoupper($type) . ' LEAGUE SIDES - ' . $league_array["date"]);

        //Teams
        $thinBorderAll = array(
            'borders' => array(
                'allborders' => array(
                    'style' => PHPExcel_Style_Border::BORDER_THIN
                )
            )
        );

        $thickBorderOutline = array(
            'borders' => array(
                'outline' => array(
                    'style' => PHPExcel_Style_Border::BORDER_THICK
                )
            )
        );

        $thickBorderBottom = array(
            'borders' => array(
                'bottom' => array(
                    'style' => PHPExcel_Style_Border::BORDER_THICK
                )
            )
        );

        $start=3;
        for ($x = 0; $x <= count($league_array[$type]["team"])-1; $x++) {
            if (!array_key_exists("division_type", $league_array[$type]["team"][$x])) {
                continue;
            }
            if ($x>0) {
                $start=$start+5;
            }

            $teamNo=$x+1;

            $foursSkip=$league_array[$type]["team"][$x]["fours"]["skip"];
            $foursThird=$league_array[$type]["team"][$x]["fours"]["third"];
            $foursSecond=$league_array[$type]["team"][$x]["fours"]["second"];
            $foursLead=$league_array[$type]["team"][$x]["fours"]["lead"];

            $hasTrips=false;
            $tripsSkip="";
            $tripsSecond="";
            $tripsLead="";
            if (array_key_exists("trips", $league_array[$type]["team"][$x])) {
                $hasTrips=true;
                $tripsSkip=$league_array[$type]["team"][$x]["trips"]["skip"];
                $tripsSecond=$league_array[$type]["team"][$x]["trips"]["second"];
                $tripsLead=$league_array[$type]["team"][$x]["trips"]["lead"];
            }

            $objSheet->getStyle(cellReference('A', 0, $start))->getFont()->setBold(true)->setUnderline(true);
            $objSheet->getStyle(cellReference('A', 1, $start) . ":" . cellReference('J', 1, $start))->applyFromArray($thinBorderAll);
            if ($hasTrips) {
                $objSheet->getStyle(cellReference('C', 2, $start) . ":" . cellReference('J', 2, $start))->applyFromArray($thinBorderAll);
                $objSheet->getStyle(cellReference('C', 1, $start) . ":" . cellReference('J', 2, $start))->applyFromArray($thickBorderOutline);
            } else {
                $objSheet->getStyle(cellReference('C', 1, $start) . ":" . cellReference('J', 1, $start))->applyFromArray($thickBorderOutline);
            }
            $objSheet->getStyle(cellReference('A', 4, $start) . ":" . cellReference('N', 4, $start))->applyFromArray($thickBorderBottom);

            $objSheet->getCell(cellReference('A', 0, $start))->setValue($league_array[$type]["team"][$x]["division_type"]);
            $objSheet->getCell(cellReference('D', 0, $start))->setValue('D');
            $objSheet->getCell(cellReference('F', 0, $start))->setValue('D');
            $objSheet->getCell(cellReference('H', 0, $start))->setValue('D');
            $objSheet->getCell(cellReference('J', 0, $start))->setValue('D');

            $objSheet->getCell(cellReference('A', 1, $start))->setValue('Div ' . $league_array[$type]["team"][$x]["division_no"]);
            $objSheet->getCell(cellReference('B', 1, $start))->setValue('Kdp ' . $teamNo);
            $objSheet->getCell(cellReference('C', 1, $start))->setValue($foursSkip);
            $objSheet->getCell(cellReference('E', 1, $start))->setValue($foursThird);
            $objSheet->getCell(cellReference('G', 1, $start))->setValue($foursSecond);
            $objSheet->getCell(cellReference('I', 1, $start))->setValue($foursLead);
            $objSheet->getCell(cellReference('L', 1, $start))->setValue('Venue:');
            $objSheet->getCell(cellReference('M', 1, $start))->setValue($league_array[$type]["team"][$x]["venue"]);

            if ($hasTrips) {
                $objSheet->getCell(cellReference('C', 2, $start))->setValue($tripsSkip);
                $objSheet->getCell(cellReference('G', 2, $start))->setValue($tripsSecond);
                $objSheet->getCell(cellReference('I', 2, $start))->setValue($tripsLead);
            }

            $objSheet->getCell(cellReference('L', 2, $start))->setValue('Opponent:');
            $objSheet->getCell(cellReference('M', 2, $start))->setValue($league_array[$type]["team"][$x]["opponent"]);

            $objSheet->getCell(cellReference('L', 3, $start))->setValue('Depart:');
            $objSheet->getCell(cellReference('M', 3, $start))->setValue($league_array[$type]["team"][$x]["depart"]);

            $objSheet->getCell(cellReference('L', 4, $start))->setValue('Captain:');
            $objSheet->getCell(cellReference('M', 4, $start))->setValue($league_array[$type]["team"][$x]["captain"]);
        }

        $start+=6;
        //Reserves and Unavailable
        $objSheet->getStyle(cellReference('B', 0, $start))->getFont()->setUnderline(true);
        $objSheet->getCell(cellReference('B', 0, $start))->setValue("Reserves:");
        $objSheet->getCell(cellReference('D', 0, $start))->setValue($league_array[$type]["reserves"]);

        $start++;
        $objSheet->getStyle(cellReference('B', 0, $start))->getFont()->setUnderline(true);
        $objSheet->getCell(cellReference('B', 0, $start))->setValue("Unavailable:");
        $objSheet->getCell(cellReference('D', 0, $start))->setValue($league_array[$type]["unavailable"]);

        $start++;
        $objSheet->getStyle(cellReference('B', 0, $start))->getFont()->setBold(true)->setUnderline(true);
        $objSheet->getCell(cellReference('B', 0, $start))->setValue("NOTES");

        $start++;
        for ($x = 0; $x <= count($league_array["notes"]["note"])-1; $x++) {
            $objSheet->getCell(cellReference('B', 0, $start))->setValue($league_array["notes"]["note"][$x]);
            $start++;
        }
    }
?>