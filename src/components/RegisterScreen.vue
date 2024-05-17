<template>
    <v-dialog v-model="show" transition="dialog-bottom-transition" width="400">
        <template>
        <v-card class="text-center pa-6">
            <v-alert v-if="erro" type="error" outlined>
            {{ erro }}
            </v-alert>
            <v-col class="text-h6">
            Cadastro de cliente
            <v-icon class="ml-5" color="black" medium @click.stop="show=false">mdi-close-circle-outline</v-icon>
            </v-col>
            <v-col>
            <v-text-field v-model="User.nome" required class="mb-2" label="Nome" outlined color="grey"></v-text-field>
            </v-col>
            <v-col>
            <v-text-field
                v-mask="'###.###.###-##'"
                placeholder="000.000.000-00"
                v-model="User.cpf_cadastro"
                class="mb-2"
                label="CPF"
                outlined
                required
                color="grey"></v-text-field>
            </v-col>
            <v-col>
            <v-text-field
                v-model="User.email"
                class="mb-2"
                label="E-mail"
                required
                outlined
                color="grey"></v-text-field>
            </v-col>
            <v-col>
            <v-text-field
                v-model="User.telefone"
                class="mb-2"
                v-mask="'(##)#####-####'"
                label="Telefone"
                required
                outlined 
                color="grey"></v-text-field>
            </v-col>
            <v-card-actions class="justify-center w-100">
            <v-btn large type="submit" color="success" width="90%" @click="addUser">Cadastrar</v-btn>
            </v-card-actions>
        </v-card>
        </template>
    </v-dialog>
</template>


<script>
export default {
    props: {
        value: Boolean
    },
    data() {
        return {
            User: {
                nome: '',
                cpf_cadastro: '',
                email: '',
                telefone: ''
            },
            erro: '',
        }
    },
    methods: {
        async addUser() {
            this.erro = false
            if (this.User.nome === ''){
                this.erro = 'Insira um nome!'
                return
            }
            if (this.User.cpf_cadastro === ''){
                this.erro = 'Insira um CPF!'
                return
            }
            if (this.User.email === ''){
                this.erro = 'Insira um email!'
                return
            }
            if (this.User.telefone === ''){
                this.erro = 'Insira um telefone!'
                return
            }

            const novoUsuario = await this.$store.dispatch(
                'user/addUser',
                this.User
            )
            if(novoUsuario) {
                this.erro = await novoUsuario
                return
            }
            this.$emit('input', false)
        },
    },
    computed: {
        show: {
            get () {
                return this.value
            },
            set (value) {
                this.User.nome = ''
                this.User.cpf_cadastro = ''
                this.User.email = ''
                this.User.telefone = ''
                this.erro - '',
                this.$emit('input', value)
            },
        }
    },
}
</script>