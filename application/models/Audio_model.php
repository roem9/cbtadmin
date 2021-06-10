<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Audio_model extends MY_Model {

    public function loadAudio(){
        $this->datatables->select("id_audio, nama_audio, nama_file");
        $this->datatables->from("audio as a");
        $this->datatables->add_column('action','
                <span class="dropdown">
                    <button class="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">Actions</button>
                    <div class="dropdown-menu dropdown-menu-end">
                        <a class="dropdown-item editAudio" href="#editAudio" data-bs-toggle="modal" data-id="$1">
                            '.tablerIcon("info-circle", "me-1").'
                            Detail Audio
                        </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item hapusAudio" href="javascript:void(0)" data-id="$1">
                            '.tablerIcon("trash", "me-1").'
                            Hapus
                        </a>
                    </div>
                </span>', 'id_audio, md5(id_audio)');
            
        return $this->datatables->generate();
    }

    public function edit_audio(){
        $id_audio = $this->input->post("id_audio");
        
        $data = [
            "nama_audio" => $this->input->post("nama_audio"),
        ];

        $data = $this->edit_data("audio", ["id_audio" => $id_audio], $data);
        if($data){
            return 1;
        } else {
            return 0;
        }
    }
}

/* End of file Subsoal.php */
