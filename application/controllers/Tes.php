<?php


defined('BASEPATH') OR exit('No direct script access allowed');

class Tes extends CI_Controller {

    
    public function __construct() {
        parent::__construct();
        $this->load->model("Main_model");
        $this->load->model("Soal_model");
    
        // Load Pagination library
        $this->load->library('pagination');

        ini_set('xdebug.var_display_max_depth', '10');
        ini_set('xdebug.var_display_max_children', '256');
        ini_set('xdebug.var_display_max_data', '1024');
        
        if(!$this->session->userdata('admintoafl')){
            $this->session->set_flashdata('pesan', '
                <div class="alert alert-important alert-danger alert-dismissible" role="alert">
                    <div class="d-flex">
                        <div>
                            <svg width="24" height="24" class="alert-icon">
                                <use xlink:href="'.base_url().'assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-alert-circle" />
                            </svg>
                        </div>
                        <div>
                            Anda harus login terlebih dahulu
                        </div>
                    </div>
                    <a class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="close"></a>
                </div>
            ');

			redirect(base_url("auth"));
		}
    }
    
    public function index(){
        // navbar and sidebar
        $data['menu'] = "Tes";

        // for title and header 
        $data['title'] = "List Tes";

        // for modal 
        $data['modal'] = ["modal_tes"];
        
        // javascript 
        $data['js'] = [
            "modules/other.js", 
            "modules/tes.js",
            "load_data/reload_tes.js",
        ];

        $data['listSoal'] = $this->Main_model->get_all("soal", ["hapus" => 0], "nama_soal");

        // $this->load->view("pages/tes/list-tes", $data);
        $this->load->view("pages/tes/list-tes", $data);
    }

    public function hasil($id){
        // navbar and sidebar
        $data['menu'] = "Tes";

        // for title and header 
        $data['title'] = "List Hasil Tes";

        $respon = $this->Main_model->get_all("peserta", ["md5(id_tes)" => $id]);
        $data['respon'] = [];
        foreach ($respon as $i => $respon) {
            $data['respon'][$i] = $respon;
            $jawaban = explode("###", $respon['text']);
            $data['respon'][$i]['text'] = $jawaban;
        }

        $this->load->view("pages/tes/hasil-tes", $data);
    }

    public function loadRecord($rowno=0){
        // Row per page
        $rowperpage = 6;
    
        // Row position
        if($rowno != 0){
          $rowno = ($rowno-1) * $rowperpage;
        }
     
        // All records count
        $allcount = COUNT($this->Main_model->get_all("tes", ["hapus" => 0], "tgl_tes", "DESC"));
    
        // Get records
        $record = $this->Main_model->get_all_limit("tes", ["hapus" => 0], "tgl_tes", "DESC", $rowno, $rowperpage);

        $users_record = [];

        foreach ($record as $i => $record) {
            $users_record[$i] = $record;
            $users_record[$i]['id_hasil'] = md5($record['id_tes']);
            $users_record[$i]['link'] = 'https://cbt.mrscholae.com/soal/id/'.md5($record['id_tes']);
            $users_record[$i]['tgl_tes'] = $this->hari_ini(date("D", strtotime($record['tgl_tes']))) . ", " . $this->tgl_indo(date("d-M-Y", strtotime($record['tgl_tes'])));
            $users_record[$i]['tgl_pengumuman'] = $this->hari_ini(date("D", strtotime($record['tgl_pengumuman']))) . ", " . $this->tgl_indo(date("d-M-Y", strtotime($record['tgl_pengumuman'])));
            $users_record[$i]['peserta'] = COUNT($this->Main_model->get_all("peserta", ["id_tes" => $record['id_tes']]));
            $soal = $this->Main_model->get_one("soal", ["id_soal" => $record['id_soal']]);
            $users_record[$i]['nama_soal'] = $soal['nama_soal'];
        }
        // $users_record = $this->Tes_model->getData($rowno,$rowperpage);
     
        // Pagination Configuration
        $config['base_url'] = base_url().'tes/loadRecord';
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
        $data['result'] = $users_record;
        $data['row'] = $rowno;
        $data['total_rows'] = $allcount;
        $data['total_rows_perpage'] = COUNT($users_record);
    
        echo json_encode($data);
     
    }
    
    // add 
        public function add_tes(){
            $data = [
                "tgl_tes" => $this->input->post("tgl_tes"),
                "tgl_pengumuman" => $this->input->post("tgl_pengumuman"),
                "id_soal" => $this->input->post("id_soal"),
                "waktu" => $this->input->post("waktu"),
                "password" => $this->input->post("password"),
                "catatan" => $this->input->post("catatan"),
                "status" => "Berjalan",
            ];

            $data = $this->Main_model->add_data("tes", $data);
            if($data){
                echo json_encode("1");
            } else {
                echo json_encode("0");
            }
        }
    // add 
    
    // get 
        public function get_tes(){
            $id_tes = $this->input->post("id_tes");

            $data = $this->Main_model->get_one("tes", ["id_tes" => $id_tes]);
            echo json_encode($data);
        }
    // get 

    // edit 
        public function edit_tes(){
            $id_tes = $this->input->post("id_tes");
            
            $data = [
                "tgl_tes" => $this->input->post("tgl_tes"),
                "tgl_pengumuman" => $this->input->post("tgl_pengumuman"),
                "id_soal" => $this->input->post("id_soal"),
                "waktu" => $this->input->post("waktu"),
                "password" => $this->input->post("password"),
                "catatan" => $this->input->post("catatan"),
                "status" => $this->input->post("status"),
            ];

            $data = $this->Main_model->edit_data("tes", ["id_tes" => $id_tes], $data);
            if($data){
                echo json_encode("1");
            } else {
                echo json_encode("0");
            }
        }
    // edit 

    // delete 
        public function hapus_tes(){
            $id_tes = $this->input->post("id_tes");

            $data = $this->Main_model->edit_data("tes", ["id_tes" => $id_tes], ["hapus" => 1, "status" => "Selesai"]);
            if($data){
                echo json_encode("1");
            } else {
                echo json_encode("0");
            }
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
    // other
}

/* End of file Tes.php */
