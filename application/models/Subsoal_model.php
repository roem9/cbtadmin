<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Subsoal_model extends MY_Model {

    public function loadSubSoal(){
        $this->datatables->select("id_sub, nama_sub, tgl_pembuatan, catatan, 
        (select count(id_item) from item_soal where a.id_sub = id_sub AND item = 'soal') as soal
        ");
        $this->datatables->from("sub_soal as a");
        $this->datatables->where("hapus", 0);
        $this->datatables->add_column('action','
                <span class="dropdown">
                    <button class="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">Actions</button>
                    <div class="dropdown-menu dropdown-menu-end">
                        <a class="dropdown-item editSubSoal" href="#editSubSoal" data-bs-toggle="modal" data-id="$1">
                            '.tablerIcon("info-circle", "me-1").'
                            Detail Tes
                        </a>
                        <a class="dropdown-item" href="'.base_url().'subsoal/edit/$2" target="_blank">
                            '.tablerIcon("files", "me-1").'
                            Soal
                        </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item hapusSubSoal" href="javascript:void(0)" data-id="$1">
                            '.tablerIcon("trash", "me-1").'
                            Hapus
                        </a>
                    </div>
                </span>', 'id_sub, md5(id_sub)');
            
        $this->datatables->edit_column("tgl_pembuatan", '$1', 'tgl_indo(tgl_pembuatan, lengkap)');
        return $this->datatables->generate();
    }
}

/* End of file Subsoal.php */
