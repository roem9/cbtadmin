<?php


defined('BASEPATH') OR exit('No direct script access allowed');

class Audio extends MY_Controller {

    
    public function __construct()
    {
        parent::__construct();
        $this->load->model("Main_model");
    }
    
    public function index(){
        // for if statement navbar fitur
        $data['menu'] = "Audio";

        // for title and header 
        $data['title'] = "List Audio";

        // for modal 
        $data['modal'] = [
            "modal_audio",
            "modal_setting"
        ];
        
        // for js 
        $data['js'] = [
            "ajax.js",
            "function.js",
            "helper.js",
            "modules/setting.js", 
            "modules/audio.js",
            "load_data/audio_reload.js",
        ];

        $this->load->view("pages/audio/list", $data);
    }

    // ajax 
        public function ajax_list_audio(){
            $audio = $this->Main_model->get_all("audio", "", "nama_audio");
            foreach ($audio as $i => $audio) {
                $data[$i] = $audio;
            }

            echo json_encode($data);
        }

        public function loadAudio(){
            header('Content-Type: application/json');
            $output = $this->audio->loadAudio();
            echo $output;
        }
    // ajax 

    // add 
        public function upload_data(){
            if(isset($_FILES['file']['name'])) {

                $id = $this->Main_model->get_one("audio", "", "id_audio", "DESC");

                $nama_file = $_FILES['file'] ['name']; // Nama Audio
                $size        = $_FILES['file'] ['size'];// Size Audio
                $error       = $_FILES['file'] ['error'];
                $tipe_audio  = $_FILES['file'] ['type']; //tipe audio untuk filter
                $folder      = "./assets/myaudio/"; //folder tujuan upload
                $valid       = array('mp3'); //Format File yang di ijinkan Masuk ke server
                
                if(strlen($nama_file)){   
                     // Perintah untuk mengecek format gambar
                     list($txt, $ext) = explode(".", $nama_file);
                     if(in_array($ext,$valid)){   
                         // Perintah untuk mengupload file dan memberi nama baru
            
                         $audio = $id['id_audio'] + 1 . ".mp3";

                         $tmp = $_FILES['file']['tmp_name'];
                        
                        //  hapus foto 
                        // $hapus = $this->Main_model->get_one("kpq", ["nip" => $nip]);
                        // if($hapus['foto'] != ""){
                        //     unlink('./assets/img/foto/'.$hapus['foto']);
                        // }
                         
                        if(move_uploaded_file($tmp, $folder.$audio)){   
                            $data = [
                                "nama_audio" => $this->input->post("nama_audio"),
                                "nama_file" => $audio
                            ];
                            
                            $this->Main_model->add_data("audio", $data);
                            // $this->Main_model->edit_data("kpq", ["nip" => $nip], ["foto" => $audio]);
                            // $this->session->set_flashdata('pesan', '<div class="alert alert-success alert-dismissible fade show" role="alert"><i class="fa fa-check-circle text-success mr-1"></i> Berhasil mengupload foto<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
                            echo json_encode(1);
                            
                        } else { // Jika Audio Gagal Di upload 
                            echo json_encode(0);
                            // $this->session->set_flashdata('pesan', '<div class="alert alert-danger alert-dismissible fade show" role="alert"><i class="fa fa-times-circle text-danger mr-1"></i> Gagal mengupload foto<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
                        }
                     } else{ // Jika File Audio Yang di Upload tidak sesuai eksistensi yang sudah di tetapkan
                        // $this->session->set_flashdata('pesan', '<div class="alert alert-danger alert-dismissible fade show" role="alert"><i class="fa fa-times-circle text-danger mr-1"></i> Format Gambar Tidak valid , Format Gambar Harus (JPG, Jpeg, png)<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
                        echo json_encode(2);
                    }
            
                }
                
            }
        }

        public function add_audio(){
            $penjual = $this->_data_penjual();

            $data = [
                "nama_audio" => $this->input->post("nama_audio"),
                "jenis" => $this->input->post("jenis"),
                "satuan" => $this->input->post("satuan"),
                "harga_satuan" => $this->Main_model->nominal($this->input->post("harga_satuan")),
                "min_stok" => $this->input->post("min_stok"),
                "id_penjual" => $penjual['id_penjual']
            ];

            $data = $this->Main_model->add_data("audio", $data);
            if($data){
                echo json_encode("1");
            } else {
                echo json_encode("0");
            }
        }
    // add 
    
    // get 
        public function get_audio(){
            $id_audio = $this->input->post("id_audio");

            $data = $this->Main_model->get_one("audio", ["id_audio" => $id_audio]);
            echo json_encode($data);
        }

        public function get_all_audio(){
            $data = $this->Main_model->get_all("audio", "", "nama_audio");
            echo json_encode($data);
        }
        
    // get 

    // edit 
        public function edit_audio(){
            $data = $this->audio->edit_audio();
            echo json_encode($data);
        }
    // edit 

    // delete 
        public function hapus_audio(){
            $id_audio = $this->input->post("id_audio");
            $data = $this->Main_model->get_one("audio", ["id_audio" => $id_audio]);
            
            $this->Main_model->delete_data("audio", ["id_audio" => $id_audio]);

            if($data){
                unlink('./assets/myaudio/'.$data['nama_file']);
                echo json_encode("1");
            } else {
                echo json_encode("0");
            }
        }
    // delete 
}

/* End of file Audio.php */
