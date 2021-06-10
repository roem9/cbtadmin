<?php


defined('BASEPATH') OR exit('No direct script access allowed');

class Soal extends MY_Controller {

    
    public function __construct() {
        parent::__construct();
        $this->load->model("Main_model");
        $this->load->model("Other_model");
        $this->load->model("Soal_model");
    }
    
    public function index(){
        // navbar and sidebar
        $data['menu'] = "Soal";

        // for title and header 
        $data['title'] = "List Soal";

        // for modal 
        $data['modal'] = [
            "modal_soal",
            "modal_setting"
        ];
        
        // javascript 
        $data['js'] = [
            "ajax.js",
            "function.js",
            "helper.js",
            "modules/setting.js",
            "modules/soal.js",
            // "load_data/reload_soal.js",
            "load_data/soal_reload.js",
        ];

        $data['sub_soal'] = $this->Main_model->get_all("sub_soal", ["hapus" => 0], "nama_sub");

        // $this->load->view("pages/soal/list-soal", $data);
        $this->load->view("pages/soal/list", $data);
    }

    public function hasil($id){
        // navbar and sidebar
        $data['menu'] = "Soal";

        // for title and header 
        $data['title'] = "List Hasil Soal";

        $respon = $this->Main_model->get_all("peserta", ["md5(id_soal)" => $id]);
        $data['respon'] = [];
        foreach ($respon as $i => $respon) {
            $data['respon'][$i] = $respon;
            $jawaban = explode("###", $respon['text']);
            $data['respon'][$i]['text'] = $jawaban;
        }

        $this->load->view("pages/soal/hasil-soal", $data);
    }

    public function loadRecord($rowno=0){
        // Row per page
        $rowperpage = 6;
    
        // Row position
        if($rowno != 0){
          $rowno = ($rowno-1) * $rowperpage;
        }
     
        // All records count
        $allcount = COUNT($this->Main_model->get_all("soal", ["hapus" => 0], "tgl_pembuatan", "DESC"));
    
        // Get records
        $record = $this->Main_model->get_all_limit("soal", ["hapus" => 0], "tgl_pembuatan", "DESC", $rowno, $rowperpage);

        $result = [];

        foreach ($record as $i => $record) {
            $result[$i] = $record;
            $result[$i]['tgl_pembuatan'] = $this->hari_ini(date("D", strtotime($record['tgl_pembuatan']))) . ", " . $this->tgl_indo(date("d-M-Y", strtotime($record['tgl_pembuatan'])));
            $result[$i]['link'] = md5($record['id_soal']);

            $result[$i]['sesi'] = [];
            $sesi = $this->Main_model->get_all("sesi_soal", ["id_soal" => $record['id_soal']]);
            foreach ($sesi as $z => $sesi) {
                $sesi_soal = $this->Main_model->get_one("sub_soal", ["id_sub" => $sesi['id_sub']]);
                $result[$i]['sesi'][$z] = $sesi_soal;
                $result[$i]['sesi'][$z]['id'] = $sesi['id'];
            }
        }
     
        // Pagination Configuration
        $config['base_url'] = base_url().'soal/loadRecord';
        $config['use_page_numbers'] = TRUE;
        $config['total_rows'] = $allcount;
        $config['per_page'] = $rowperpage;

        // Membuat Style pagination untuk BootStrap v4
        $config['first_link']       = "First";
        $config['last_link']        = "Last";
        $config['next_link']        = '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="9 6 15 12 9 18" /></svg>';
        $config['prev_link']        = '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="15 6 9 12 15 18" /></svg>';
        $config['full_tag_open']    = '<nav><ul class="pagination pagination-md justify-content-center">';
        $config['full_tag_close']   = '</ul></nav>';
        $config['num_tag_open']     = '<li class="page-item"><span class="page-link">';
        $config['num_tag_close']    = '</span></li>';
        $config['cur_tag_open']     = '<li class="page-item active"><span class="page-link">';
        $config['cur_tag_close']    = '<span class="sr-only"></span></span></li>';
        $config['next_tag_open']    = '<li class="page-item"><span class="page-link">';
        $config['next_tagl_close']  = '<span aria-hidden="true">&raquo;</span></span></li>';
        $config['prev_tag_open']    = '<li class="page-item"><span class="page-link">';
        $config['prev_tagl_close']  = '</span>Next</li>';
        $config['first_tag_open']   = '<li class="page-item"><span class="page-link">';
        $config['first_tagl_close'] = '</span></li>';
        $config['last_tag_open']    = '<li class="page-item"><span class="page-link">';
        $config['last_tagl_close']  = '</span></li>';

        // Initialize
        $this->pagination->initialize($config);
    
        // Initialize $data Array
        $data['pagination'] = $this->pagination->create_links();
        $data['result'] = $result;
        $data['row'] = $rowno;
        $data['total_rows'] = $allcount;
        $data['total_rows_perpage'] = COUNT($result);
    
        echo json_encode($data);
     
    }
    
    // reload
        public function loadSoal(){
            header('Content-Type: application/json');
            $output = $this->soal->loadSoal();
            echo $output;
        }
    // reload

    // add 
        public function add_soal(){
            $data = $this->soal->add_soal();
            echo json_encode($data);
        }

        public function add_item_soal(){
            $id_soal = $this->input->post("id_soal");
            $soal = $this->Main_model->get_one("soal", ["md5(id_soal)" => $id_soal]);

            $item = $this->Main_model->get_one("item_soal", ["md5(id_soal)" => $id_soal], "urutan", "DESC");
            if($item) {
                $urutan = $item['urutan'] + 1;
            } else {
                $urutan = 1;
            }

            $data = [
                "id_soal" => $soal['id_soal'],
                "tipe_soal" => $this->input->post("tipe_soal"),
                "item" => $this->input->post("item"),
                "data" => $this->input->post("data_soal"),
                "penulisan" => $this->input->post("penulisan"),
                "urutan" => $urutan,
            ];

            $query = $this->Main_model->add_data("item_soal", $data);
            if($query){
                echo json_encode(1);
            } else {
                echo json_encode(0);
            }
        }

        public function add_sub_soal(){
            $data = $this->soal->add_sub_soal();
            echo json_encode($data);

            // $table = $this->input->post("table");
            // unset($_POST['table']);

            // $query = $this->Main_model->add_data($table, $_POST);
            // if($query) echo json_encode(1);
            // else echo json_encode(0);
        }
    // add 
    
    // get 
        public function get_soal(){
            $data = $this->soal->get_soal();
            echo json_encode($data);
        }

        public function get_soal_listening(){
            $id_soal = $this->input->post("id_soal");

            $data = $this->Main_model->get_one("soal", ["md5(id_soal)" => $id_soal]);

            $listening = $this->Main_model->get_all("item_soal", ["md5(id_soal)" => $id_soal, "tipe_soal" => "Listening"], "urutan", "ASC");
            $data['item'] = [];

            $j = 1;
            foreach ($listening as $i => $soal) {
                if($soal['item'] == "soal"){
                    $txt_soal = explode("###", $soal['data']);
                    
                    if($soal['penulisan'] == "RTL"){
                        $no = $this->Other_model->angka_arab($j).". ";
                        $txt_soal[0] = str_replace("{no}", $no, $txt_soal[0]);
                    } else {
                        $no = $j.". ";
                        $txt_soal[0] = str_replace("{no}", $no, $txt_soal[0]);
                    }

                    $data['item'][$i]['id_item'] = $soal['id_item'];
                    $data['item'][$i]['item'] = $soal['item'];
                    $data['item'][$i]['data']['soal'] = $txt_soal[0];
                    $data['item'][$i]['data']['pilihan'] = explode("///", $txt_soal[1]);
                    $data['item'][$i]['data']['jawaban'] = $txt_soal[2];
                    $data['item'][$i]['penulisan'] = $soal['penulisan'];
                    
                    $j++;

                } else if($soal['item'] == "petunjuk" || $soal['item'] == "audio"){
                    $data['item'][$i] = $soal;
                    $audio = $this->Main_model->get_one("audio", ["id_audio" => $soal['data']]);
                    $data['item'][$i]['file'] = $audio['nama_file'];
                    $data['item'][$i]['nama'] = $audio['nama_audio'];
                }
            }

            echo json_encode($data);
        }

        public function get_soal_structure(){
            $id_soal = $this->input->post("id_soal");

            $data = $this->Main_model->get_one("soal", ["md5(id_soal)" => $id_soal]);

            $structure = $this->Main_model->get_all("item_soal", ["md5(id_soal)" => $id_soal, "tipe_soal" => "Structure"], "urutan", "ASC");
            $data['item'] = [];

            $j = 1;
            foreach ($structure as $i => $soal) {
                if($soal['item'] == "soal"){
                    $txt_soal = explode("###", $soal['data']);
                    
                    if($soal['penulisan'] == "RTL"){
                        $no = $this->Other_model->angka_arab($j).". ";
                        $txt_soal[0] = str_replace("{no}", $no, $txt_soal[0]);
                    } else {
                        $no = $j.". ";
                        $txt_soal[0] = str_replace("{no}", $no, $txt_soal[0]);
                    }

                    $data['item'][$i]['id_item'] = $soal['id_item'];
                    $data['item'][$i]['item'] = $soal['item'];
                    $data['item'][$i]['data']['soal'] = $txt_soal[0];
                    $data['item'][$i]['data']['pilihan'] = explode("///", $txt_soal[1]);
                    $data['item'][$i]['data']['jawaban'] = $txt_soal[2];
                    $data['item'][$i]['penulisan'] = $soal['penulisan'];
                    
                    $j++;

                } else if($soal['item'] == "petunjuk" || $soal['item'] == "audio"){
                    $data['item'][$i] = $soal;
                    $audio = $this->Main_model->get_one("audio", ["id_audio" => $soal['data']]);
                    $data['item'][$i]['file'] = $audio['nama_file'];
                    $data['item'][$i]['nama'] = $audio['nama_audio'];
                }
            }

            echo json_encode($data);
        }

        public function get_all_item_by_tipe(){
            $id_soal = $this->input->post("id_soal");
            $tipe = $this->input->post("tipe");

            $data = $this->Main_model->get_one("soal", ["md5(id_soal)" => $id_soal]);

            $structure = $this->Main_model->get_all("item_soal", ["md5(id_soal)" => $id_soal, "tipe_soal" => $tipe], "urutan", "ASC");
            $data['item'] = [];

            $j = 1;
            foreach ($structure as $i => $soal) {
                if($soal['item'] == "soal"){
                    $txt_soal = explode("###", $soal['data']);
                    
                    if($soal['penulisan'] == "RTL"){
                        $no = $this->Other_model->angka_arab($j).". ";
                        $txt_soal[0] = str_replace("{no}", $no, $txt_soal[0]);
                    } else {
                        $no = $j.". ";
                        $txt_soal[0] = str_replace("{no}", $no, $txt_soal[0]);
                    }

                    $data['item'][$i]['id_item'] = $soal['id_item'];
                    $data['item'][$i]['item'] = $soal['item'];
                    $data['item'][$i]['data']['soal'] = $txt_soal[0];
                    $data['item'][$i]['data']['pilihan'] = explode("///", $txt_soal[1]);
                    $data['item'][$i]['data']['jawaban'] = $txt_soal[2];
                    $data['item'][$i]['penulisan'] = $soal['penulisan'];
                    
                    $j++;

                } else if($soal['item'] == "petunjuk" || $soal['item'] == "audio"){
                    $data['item'][$i] = $soal;
                    $audio = $this->Main_model->get_one("audio", ["id_audio" => $soal['data']]);
                    $data['item'][$i]['file'] = $audio['nama_file'];
                    $data['item'][$i]['nama'] = $audio['nama_audio'];
                }
            }

            echo json_encode($data);
        }

        public function get_item(){
            $id_item = $this->input->post("id_item");
            $item = $this->Main_model->get_one("item_soal", ["id_item" => $id_item]);
            
            if($item['item'] == "soal"){
                $data = $item;

                $item = explode("###", $item['data']);

                $data['soal'] = $item[0];
                $pilihan = explode("///", $item[1]);

                $data['pilihan_a'] = $pilihan[0];
                $data['pilihan_b'] = $pilihan[1];
                $data['pilihan_c'] = $pilihan[2];
                $data['pilihan_d'] = $pilihan[3];
                $data['jawaban'] = $item[2];
            } else if($item['item'] == "petunjuk" || $item['item'] == "audio"){
                $data = $item;
            }

            echo json_encode($data);
        }

        public function get_komponen_soal($id){
            $data = $this->soal->get_komponen_soal($id);
            echo json_encode($data);
        }
    // get 

    // edit 
        public function edit_soal(){
            $data = $this->soal->edit_soal();
            echo json_encode($data);
        }

        public function edit_item(){
            $id_item = $this->input->post("id_item");

            $data = [
                "data" => $this->input->post("data_soal"),
                "penulisan" => $this->input->post("penulisan"),
            ];

            $query = $this->Main_model->edit_data("item_soal", ["id_item" => $id_item], $data);
            if($query){
                echo json_encode(1);
            } else {
                echo json_encode(0);
            }
        }

        public function edit_urutan(){
            $id_item = $this->input->post("id_item");

            $i = 1;
            foreach ($id_item as $item) {
                $this->Main_model->edit_data("item_soal", ["id_item" => $item], ["urutan" => $i]);
                $i++;
            }

            echo json_encode(1);
        }
    // edit 

    // delete 
        public function hapus_soal(){
            $data = $this->soal->hapus_soal();
            echo json_encode($data);
        }

        public function hapus_item(){
            $id_item = $this->input->post("id_item");

            $item = $this->Main_model->get_one("item_soal", ["id_item" => $id_item]);

            $id_soal = $item['id_soal'];
            $urutan = $item['urutan'];

            $all_item = $this->Main_model->get_all("item_soal", ["id_soal" => $id_soal, "urutan > ", $urutan]);
            foreach ($all_item as $item) {
                $urutan = $item['urutan'] - 1;
                $this->Main_model->edit_data("item_soal", ["id_item" => $item['id_item']], ["urutan" => $urutan]);
            }

            $data = $this->Main_model->delete_data("item_soal", ["id_item" => $id_item]);
            if($data){
                echo json_encode("1");
            } else {
                echo json_encode("0");
            }
        }

        public function delete(){
            $table = $this->input->post("table");
            unset($_POST['table']);

            $query = $this->Main_model->delete_data($table, $_POST);
            if($query) echo json_encode(1);
            else echo json_encode(0);
        }
    // delete

    // other 
        function hari_ini($hari){
            // $hari = date ("D");
        
            switch($hari){
                case 'Sun':
                    $hari_ini = "Minggu";
                break;
        
                case 'Mon':			
                    $hari_ini = "Senin";
                break;
        
                case 'Tue':
                    $hari_ini = "Selasa";
                break;
        
                case 'Wed':
                    $hari_ini = "Rabu";
                break;
        
                case 'Thu':
                    $hari_ini = "Kamis";
                break;
        
                case 'Fri':
                    $hari_ini = "Jumat";
                break;
        
                case 'Sat':
                    $hari_ini = "Sabtu";
                break;
                
                default:
                    $hari_ini = "Tidak di ketahui";		
                break;
            }
        
            return $hari_ini;
        
        }

        public function tgl_indo($tgl){
            $data = explode("-", $tgl);
            $hari = $data[0];
            $bulan = $data[1];
            $tahun = $data[2];
    
            if($bulan == "01") $bulan = "Januari";
            if($bulan == "02") $bulan = "Februari";
            if($bulan == "03") $bulan = "Maret";
            if($bulan == "04") $bulan = "April";
            if($bulan == "05") $bulan = "Mei";
            if($bulan == "06") $bulan = "Juni";
            if($bulan == "07") $bulan = "Juli";
            if($bulan == "08") $bulan = "Agustus";
            if($bulan == "09") $bulan = "September";
            if($bulan == "10") $bulan = "Oktober";
            if($bulan == "11") $bulan = "November";
            if($bulan == "12") $bulan = "Desember";
    
            return $hari . " " . $bulan . " " . $tahun;
        }
    //
}

/* End of file Soal.php */
