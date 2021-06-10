<?php


defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

    
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Main_model');
        //Do your magic here
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
        $data['menu'] = "Dashboard";

        // for title and header 
        $data['title'] = "Dashboard";

        $data['modal'] = ["modal_setting"];
        // javascript 
        $data['js'] = [
            "modules/other.js",
            "modules/setting.js",
            "load_data/reload_home.js",
        ];
        
        $data['soal'] = COUNT($this->Main_model->get_all("soal", ["hapus" => 0]));
        $data['tes'] = COUNT($this->Main_model->get_all("tes", ["hapus" => 0]));
        $data['peserta'] = COUNT($this->Main_model->get_all("peserta"));

        $this->load->view("pages/index", $data);
    }

    public function get_dashboard(){
        $data['soal'] = COUNT($this->Main_model->get_all("soal", ["hapus" => 0]));
        $data['tes'] = COUNT($this->Main_model->get_all("tes", ["hapus" => 0]));
        $data['peserta'] = COUNT($this->Main_model->get_all("peserta"));

        echo json_encode($data);
    }

    public function getSetting(){
        $data['web_admin'] = $this->Main_model->get_one("config", ["field" => "web admin"]);
        $data['web_peserta'] = $this->Main_model->get_one("config", ["field" => "web peserta"]);

        echo json_encode($data);
    }

    public function edit_setting(){
        $web_admin = $this->input->post("web_admin");
        $this->Main_model->edit_data("config", ["field" => "web admin"], ["value" => $web_admin]);
        
        $web_peserta = $this->input->post("web_peserta");
        $this->Main_model->edit_data("config", ["field" => "web peserta"], ["value" => $web_peserta]);

        echo json_encode("1");
    }
}

/* End of file Home.php */
