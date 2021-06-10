<?php
    function tgl_arab($tgl){
        $data = explode("-", $tgl);
        $hari = angka_arab($data[0]);
        $bulan = bulan_arab($data[1]);
        // $tahun = angka_arab($data[2]);

        return $hari . " مِنْ " . $bulan;
    }

    function hari_ini_arab($hari){
        // $hari = date ("D");
    
        switch($hari){
            case 'Sun':
                $hari_ini = "الأحد";
            break;
    
            case 'Mon':			
                $hari_ini = "الإثنين";
            break;
    
            case 'Tue':
                $hari_ini = "الثلاثاء";
            break;
    
            case 'Wed':
                $hari_ini = "الأربعاء";
            break;
    
            case 'Thu':
                $hari_ini = "الخميس";
            break;
    
            case 'Fri':
                $hari_ini = "الجمعة";
            break;
    
            case 'Sat':
                $hari_ini = "السبت";
            break;
            
            default:
                $hari_ini = "Tidak di ketahui";		
            break;
        }
        return $hari_ini;
    }
    
    function angka_arab($data){
        $data = str_replace("0", "٠", $data);
        $data = str_replace("1", "١", $data);
        $data = str_replace("2", "٢", $data);
        $data = str_replace("3", "٣", $data);
        $data = str_replace("4", "٤", $data);
        $data = str_replace("5", "٥", $data);
        $data = str_replace("6", "٦", $data);
        $data = str_replace("7", "٧", $data);
        $data = str_replace("8", "٨", $data);
        $data = str_replace("9", "٩", $data);

        return $data;
    }

    function bulan_arab($data){
        if($data == "01") return "يناير";
        if($data == "02") return "فبراير";
        if($data == "03") return "مارس";
        if($data == "04") return "أبريل";
        if($data == "05") return "مايو";
        if($data == "06") return "يونيو";
        if($data == "07") return "يوليو";
        if($data == "08") return "أغسطس";
        if($data == "09") return "سبتمبر";
        if($data == "10") return "أكتوبر";
        if($data == "11") return "نوفمبر";
        if($data == "12") return "ديسمبر";
    }
?>
<!DOCTYPE html>
<html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .qrcode{
            /* background-color: yellow; */
            width: 210px;
			position: absolute;
            left: 273px;
			/* top: 170px; */
			top: 197px;
            font-size: 35px;
            word-spacing: 3px;
        }

        .nilai{
            /*background-color: yellow; */
            width: 210px;
			position: absolute;
            right: 55px;
			top: 359px;
            font-size: 35px;
            font-family: 'cambria';
            /* direction: 'rtl'; */
            word-spacing: 3px;
        }

        .index{
            /* background-color: yellow; */
            /*background-color: yellow; */
            width: 210px;
			position: absolute;
            right: 55px;
			top: 409px;
            font-size: 30px;
            font-family: 'arial';
            direction: 'rtl';
            word-spacing: 3px;
        }

        .nama{
            /* background-color: yellow; */
            /* background-color: yellow; */
            width: 610px;
            /* width: 430px; */
			position: absolute;
            /*right: 485px;*/
            /* right: 428px; */
            right: 341px;
			top: 425px;
            font-size: 32px;
            font-family: 'bodoni';
            direction: 'rtl';
            word-spacing: 3px;
        }

        .ttl{
            /* background-color: yellow; */
            /*background-color: yellow; */
            width: 430px;
			position: absolute;
            /*right: 485px;*/
            right: 428px;
			top: 481px;
            font-size: 25px;
            font-family: 'bodoni';
            direction: 'rtl';
            word-spacing: 3px;
        }
        
        .istima{
            /* background-color: yellow; */
            /*background-color: blue; */
            width: 50px;
			position: absolute;
            /*right: 260px;*/
            right: 234px;
			/*top: 459px;*/
			top: 466px;
            font-size: 18px;
            font-family: 'calibri';
            direction: 'rtl';
            word-spacing: 3px;
        }
        
        .tarakib{
            /* background-color: yellow; */
            /*background-color: yellow; */
            width: 50px;
			position: absolute;
            /*right: 260px;*/
            right: 234px;
			top: 505px;
            font-size: 18px;
            font-family: 'calibri';
            direction: 'rtl';
            word-spacing: 3px;
        }
        
        .qiroah{
            /* background-color: yellow; */
            /*background-color: yellow; */
            width: 50px;
			position: absolute;
            /*right: 260px;*/
            right: 234px;
			top: 539px;
            font-size: 18px;
            font-family: 'calibri';
            direction: 'rtl';
            word-spacing: 3px;
        }

        .tgl{
            /* background-color: yellow; */
            /*background-color: yellow; */
            /* width: 50px; */
			position: absolute;
            right: 188px;
			top: 690px;
            font-size: 23px;
            font-family: 'arab';
            direction: 'rtl';
            word-spacing: 3px;
        }

        .no_doc{
            /* background-color: yellow; */
            /*background-color: yellow; */
            /* width: 50px; */
			position: absolute;
            right: 188px;
			top: 730px;
            font-size: 16px;
            font-family: 'arab';
            direction: 'rtl';
            word-spacing: 3px;
        }

        .tgl_akhir{
            /* background-color: yellow; */
            /*background-color: yellow; */
            /* width: 50px; */
			position: absolute;
            right: 188px;
			top: 755px;
            font-size: 23px;
            font-family: 'arab';
            direction: 'rtl';
            word-spacing: 3px;
        }


        <?php if($tipe == "gambar") :?>
            @page :first {
                background-image: url("<?= base_url()?>assets/img/sertifikat.jpg");
                background-image-resize: 6;
            }
        <?php endif;?>
        
    </style>
</head>
    <body style="text-align: center">
        <div class="qrcode">
            <img src="<?= base_url()?>assets/qrcode/<?= $id?>.png" width=100 alt="">
        </div>
        <div class="nilai"><p style="text-align: center; margin: 0px">(<?= round($skor)?>)</p></div>
        <div class="index"><p style="text-align: center; margin: 0px"><?= $nilai?></p></div>
        <div class="nama"><p style="text-align: center; margin: 0px"><b><?= $nama?></b></p></div>
        <div class="ttl"><p style="text-align: center; margin: 0px"><?= $t4_lahir?>, <?= tgl_indo($tgl_lahir)?></p></div>
        <div class="istima"><p style="text-align: center; margin: 0px"><?= $istima?></p></div>
        <div class="tarakib"><p style="text-align: center; margin: 0px"><?= $tarakib?></p></div>
        <div class="qiroah"><p style="text-align: center; margin: 0px"><?= $qiroah?></p></div>
        <div class="tgl"><p style="text-align: center; margin: 0px">يوم <?= hari_ini_arab(date("D", strtotime($tgl_tes)))?>، <?= tgl_arab(date("j-m", strtotime($tgl_tes)))?> <?= angka_arab(date("Y", strtotime($tgl_tes)))?> م</p></div>
        <div class="no_doc"><p style="text-align: center; margin: 0px"><?= $no_doc?></p></div>
        <div class="tgl_akhir"><p style="text-align: center; margin: 0px"><?= tgl_arab(date("j-m", strtotime($tgl_tes)))?> <?= angka_arab(intval(date("Y", strtotime($tgl_tes)) + 2))?> م</p></div>
        
        <?php if($tipe == "gambar") :?>
            <pagebreak>
            <img src="<?= base_url()?>assets/img/sertifikat2.jpg" alt="">
        <?php endif;?>
    </body>
</html>