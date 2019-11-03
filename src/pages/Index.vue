<template>
  <q-page class="row">
    <div class="col-4 q-pa-md">
      <q-card class="row justify-center col-6 my-card">
        <q-card-section class="col-12 text-center">
          <div class="text-subtitle1"> Cadastrar Cliente </div>
        </q-card-section>

        <q-separator inset/>
        <q-card-section class="col-12">
          <div class="row justify-center">
            <q-input outlined v-model="cadastro.cliente" class="col-10 q-mt-lg" label="Nome do Cliente"/>
          </div>
          <div class="row justify-end q-mt-xl q-mb-lg">
            <q-btn class="q-mt-lg" color="primary" label="Cadastrar" @click="cadastraCliente()"/>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-4 q-pa-md">
      <q-card class="row justify-center col-6 my-card">
        <q-card-section class="col-12 text-center">
          <div class="text-subtitle1"> Cadastrar Produto </div>
        </q-card-section>

        <q-separator inset/>
        <q-card-section class="col-12">
          <div class="row justify-center">
            <q-input outlined v-model="cadastro.produto" class="col-10 q-my-xs" label="Nome do Produto"/>
            <q-input outlined v-model="cadastro.codigo" class="col-10 q-my-xs" type="number" label="Código do Produto"/>
          </div>
          <div class="row justify-end q-my-lg">
            <q-btn label="Cadastrar" @click="cadastraProduto()" color="primary"/>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-4 q-pa-md">
      <q-card class="row justify-center col-6 my-card">
        <q-card-section class="col-12 text-center">
          <div class="text-subtitle1"> Comprar Produto </div>
        </q-card-section>

        <q-separator inset/>
        <q-card-section class="col-12">
          <div class="row justify-center">
            <q-select outlined class="col-10 q-my-xs" label="Cliente" :options="clientesCadastrados"
            option-value="id"
            option-label="nome"
            v-model="clienteEscolhido"
            :disable="clientesCadastrados.length === 0"/>
            <q-select outlined class="col-10 q-my-xs" label="Produto" :options="produtosCadastrados"
            option-value="codigo"
            option-label="nome"
            v-model="produtoEscolhido"
            :disable="produtosCadastrados.length === 0"/>
          </div>
          <div class="row justify-end q-my-lg">
            <q-btn label="Comprar" @click="comprar()" color="primary"/>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { HTTPClient } from 'boot/axios'
import { Notify } from 'quasar'
export default {
  name: 'PageIndex',
  data () {
    return {
      clientesCadastrados: [],
      produtosCadastrados: [],
      clienteEscolhido: [],
      produtoEscolhido: [],
      cadastro: {
        cliente: '',
        produto: '',
        codigo: null
      }
    }
  },
  mounted () {
    this.getClientes()
    this.getProdutos()
  },
  methods: {
    getClientes () {
      HTTPClient.get('/clientes').then(res => {
        // console.log(res)
        this.clientesCadastrados = res.data
      })
    },
    getProdutos () {
      HTTPClient.get('/produtos').then(res => {
        this.produtosCadastrados = res.data
      })
    },
    comprar () {
      let dados = {
        cliente: this.clienteEscolhido.id,
        codigo: this.produtoEscolhido.codigo
      }
      HTTPClient.post('/compra', dados).then(res => {
        Notify.create({
          message: res.data,
          position: 'top',
          color: 'green'
        })
      })
    },
    cadastraCliente () {
      HTTPClient.post('/cadastro/cliente', { nome: this.cadastro.cliente }).then(res => {
        Notify.create({
          message: res.data,
          position: 'top',
          color: 'green'
        })
        this.getClientes()
      })
    },
    cadastraProduto () {
      HTTPClient.post('/cadastro/produto', { nome: this.cadastro.produto, codigo: this.cadastro.codigo }).then(res => {
        Notify.create({
          message: res.data,
          position: 'top',
          color: res.data === 'Produto Inserido' ? 'green' : 'red'
        })
        this.getProdutos()
      })
    }
  }
}
</script>
