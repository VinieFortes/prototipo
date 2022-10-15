<template>
  <q-card class="card q-ma-md bg-blue flex justify-center text-white">
    <q-card-section>
      <q-card class="bg-white text-grey-8">
        <q-card-section>
          <span style="font-size: 18px; font-weight: 700">App de Gerenciamento</span>
        </q-card-section>
        <q-card-section>
          <q-file
            v-model="xslxFile"
            label="Selecione o arquivo .xlsx"
            filled
            style="min-width: 300px"
          >
            <template v-slot:after v-if="xslxFile">
              <q-btn
                color="primary"
                dense
                icon="cloud_upload"
                round
                @click="onFileChange"
                :disable="!xslxFile"
              />
            </template>
          </q-file>
        </q-card-section>
        <q-card-section>
          <q-table
            v-if="showTable"
            style="max-width: 800px"
            :rows="rows"
            title="Formato tabela"
            :columns="columns"
            row-key="name"
          />
          <q-table
            v-if="showTable"
            style="max-width: 800px"
            :rows="rows"
            grid
            class="q-mt-md"
            title="Formato cards"
            :columns="columns"
            row-key="name"
          />
          <q-field label="Formato Texto" style="max-width: 800px" class="q-mt-md" v-if="showTable" stack-label>
            <template v-slot:control>
              <div class="self-center no-outline" tabindex="0">{{ (xslxJson) }}</div>
            </template>
          </q-field>
        </q-card-section>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script>
import readXlsxFile from 'read-excel-file'
export default {
  name: "App1",
  methods: {
    createTable(rows){
      const rowList = [];
      let rowObj = {};

      rows[0].forEach((item) =>{
        this.columns.push({name: item, required: true, label: item, align: 'left', field: item,  sortable: true})
      })

      for(let i = 1; i < rows.length; i++){
        rows[i].forEach((item, idx) =>{
          rowObj[this.columns[idx].name] = item;
        })
        this.rows.push(rowObj)
        rowObj = {};
      }

      console.log(this.rows)
      this.showTable = true;
    },

    onFileChange() {
      readXlsxFile(this.xslxFile).then((rows) => {
        this.createTable(rows);
        this.xslxJson = rows;
      })
    }
  },

  data(){
    const xslxFile = null;
    const columns = [];
    const showTable = false;
    const rows = [];
    const xslxJson = null;

    return{
      xslxFile: xslxFile,
      columns: columns,
      rows: rows,
      showTable: showTable,
      xslxJson: xslxJson
    }
  }
}
</script>

<style scoped>

</style>
