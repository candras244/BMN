async function loadHome(){

    const gedungRes =
        await fetch(
            `${API_URL}?action=getGedung`
        );

    const gedung =
        await gedungRes.json();

    const ruanganRes =
        await fetch(
            `${API_URL}?action=getRuangan`
        );

    const ruangan =
        await ruanganRes.json();

    let perawatan = [];

    try{

        const perawatanRes =
            await fetch(
                `${API_URL}?action=getPerawatanGedung`
            );

        perawatan =
            await perawatanRes.json();

    }catch(err){

        perawatan = [];

    }

    let rows = "";

    (gedung.data || gedung)
    .forEach(g=>{

        const ruangGedung =
            (ruangan.data || ruangan)
            .filter(
                r =>
                    String(
                        r.KODE_GEDUNG
                    ) ===
                    String(
                        g.KODE_GEDUNG
                    )
            );

        const jumlahRuangan =
            ruangGedung.length;

        const jumlahKantor =
            ruangGedung.filter(
                r =>
                    String(
                        r.JENIS_RUANGAN || ""
                    )
                    .toUpperCase()
                    .includes("KANTOR")
            ).length;

        const jumlahKelas =
            ruangGedung.filter(
                r =>
                    String(
                        r.JENIS_RUANGAN || ""
                    )
                    .toUpperCase()
                    .includes("KELAS")
            ).length;

        const jumlahLab =
            ruangGedung.filter(
                r =>
                    String(
                        r.JENIS_RUANGAN || ""
                    )
                    .toUpperCase()
                    .includes("LAB")
            ).length;

        const jumlahLainnya =
            jumlahRuangan -
            jumlahKantor -
            jumlahKelas -
            jumlahLab;

        const jumlahPerawatan =
            (perawatan.data || perawatan)
            .filter(
                p =>
                    String(
                        p.KODE_GEDUNG
                    ) ===
                    String(
                        g.KODE_GEDUNG
                    )
            ).length;

        rows += `

        <tr>

            <td>
                ${g.NAMA_GEDUNG}
            </td>

            <td>
                ${jumlahRuangan}
            </td>

            <td>
                ${jumlahKantor}
            </td>

            <td>
                ${jumlahKelas}
            </td>

            <td>
                ${jumlahLab}
            </td>

            <td>
                ${jumlahLainnya}
            </td>

            <td>
                ${jumlahPerawatan}
            </td>

            <td>

                <button
                    class="btn-primary"
                    onclick="
                        lihatDBRGedung(
                            '${g.KODE_GEDUNG}'
                        )
                    ">

                    DBR

                </button>

            </td>

            <td>

                <button
                    class="btn-primary"
                    onclick="
                        showDetailGedung(
                            '${g.KODE_GEDUNG}',
                            '${g.NAMA_GEDUNG}'
                        )
                    ">

                    Detail

                </button>

            </td>

        </tr>

        `;

    });

    setContent(`

    <div class="card">

        <h2>
            Daftar Gedung
        </h2>

        <br>

        <table>

            <thead>

                <tr>

                    <th>Gedung</th>

                    <th>Jumlah Ruangan</th>

                    <th>Kantor</th>

                    <th>Kelas</th>

                    <th>Lab</th>

                    <th>Lainnya</th>

                    <th>Perawatan</th>

                    <th>DBR Gedung</th>

                    <th>Detail</th>

                </tr>

            </thead>

            <tbody>

                ${rows}

            </tbody>

        </table>

    </div>

    `);

}
