<?php
    date_default_timezone_set('Asia/Kolkata');

    // include PHPExcel library and set its path accordingly.
    require('extensions/phpexcel/PHPExcel.php');

    $objPHPExcel = new PHPExcel;
    $objPHPExcel->getDefaultStyle()->getFont()->setName('Calibri');
    $objPHPExcel->getDefaultStyle()->getFont()->setSize(10);
    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, "Excel2007");

    $currencyFormat = '#,#0.## \;[Red]-#,#0.## \'';
    $numberFormat = '#,#0.##;[Red]-#,#0.##';

    $objSheet = $objPHPExcel->getActiveSheet();
    $objSheet->setTitle('My Form');

    $objSheet->getStyle('A1:B1')->getFont()->setBold(true)->setSize(12);

    $objSheet->getCell('A1')->setValue('Name');
    $objSheet->getCell('B1')->setValue('Message');

    $objSheet->getCell('A2')->setValue($_POST['txtName']);
    $objSheet->getCell('B2')->setValue($_POST['txtMessage']);

    $objSheet->getColumnDimension('A')->setAutoSize(true);
    $objSheet->getColumnDimension('B')->setAutoSize(true);

    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="file.xlsx"');
    header('Cache-Control: max-age=0');

    $objWriter->save('php://output');
?>