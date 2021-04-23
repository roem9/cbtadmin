<div class="modal modal-blur fade" id="addTes" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Tambah Tes Baru</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form class="user" id="formAddTes">
                    <div class="form-floating mb-3">
                        <input type="date" name="tgl_tes" id="tgl_tes_add" class="form-control required">
                        <label for="tgl_tes_add">Tgl Tes</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="date" name="tgl_pengumuman" id="tgl_pengumuman_add" class="form-control required">
                        <label for="tgl_pengumuman_edit">Tgl Pengumuman</label>
                    </div>
                    <div class="form-floating mb-3">
                        <select name="id_soal" id="id_soal_add" class="form-control required">
                            <option value="">Pilih Soal</option>
                            <?php foreach($listSoal as $soal) :?>
                                <option value="<?= $soal['id_soal']?>"><?= $soal['nama_soal']?></option>
                            <?php endforeach;?>
                        </select>
                        <label for="id_soal_add">Soal</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" name="waktu" class="form-control required">
                        <label for="" class="col-form-label">Waktu (menit)</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" name="password" class="form-control form-control-sm required" id="password_add">
                        <label for="password_add" class="col-form-label">Password</label>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea name="catatan" class="form-control required" style="height: 100px"></textarea>
                        <label for="" class="col-form-label">Catatan</label>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn me-auto mr-3" data-bs-dismiss="modal">Tutup</button>
                    <button type="button" class="btn btn-primary btnTambah">Tambah</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal modal-blur fade" id="editTes" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit Data Tes</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" name="id_tes">
                <div class="form-floating mb-3">
                    <select name="status" class="form-control required">
                        <option value="">Pilih Status</option>
                        <option value="Berjalan">Berjalan</option>
                        <option value="Selesai">Selesai</option>
                    </select>
                    <label for="">Status</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="date" name="tgl_tes" class="form-control required">
                    <label for="">Tgl Tes</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="date" name="tgl_pengumuman" class="form-control required">
                    <label for="">Tgl Pengumuman</label>
                </div>
                <div class="form-floating mb-3">
                    <select name="id_soal" class="form-control required">
                        <option value="">Pilih Soal</option>
                        <?php foreach($listSoal as $soal) :?>
                            <option value="<?= $soal['id_soal']?>"><?= $soal['nama_soal']?></option>
                        <?php endforeach;?>
                    </select>
                    <label for="">Soal</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="number" name="waktu" class="form-control required">
                    <label for="" class="col-form-label">Waktu (menit)</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" name="password" class="form-control required">
                    <label for="" class="col-form-label">Password</label>
                </div>
                <div class="form-floating mb-3">
                    <textarea name="catatan" class="form-control required" style="height: 100px"></textarea>
                    <label for="" class="col-form-label">Catatan</label>
                </div>
            </div>
            <div class="modal-footer">
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn me-auto mr-3" data-bs-dismiss="modal">Tutup</button>
                    <button type="button" class="btn btn-success btnEdit">Edit</button>
                </div>
            </div>
        </div>
    </div>
</div>