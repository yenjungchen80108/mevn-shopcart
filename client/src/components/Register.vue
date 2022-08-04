<template>
<v-app>
  <v-container>
    <v-row>
    <v-col
      cols="12"
      class="my-6">
      <v-card>
        <panel title="Register">
          <h6>Please fill in all fields</h6>
          <form
            autocomplete="off"
            name="myForm"
          >
          <v-text-field
            label="Email"
            type="email"
            name="email"
            placeholder="Please provide valid email(gmail, outlook, yahoo, etc.)"
            v-model="register.email"
          ></v-text-field>
          <br>
          <v-text-field
            label="Password"
            type="password"
            name="password"
            id="password"
            v-model="register.password"
            autocomplete="new-password"
          >
          </v-text-field>
          <input type="checkbox"
            @click="switchVisibility">
          <b>Show Password</b>
          <v-text-field
            label="FirstName"
            type="firstName"
            name="firstName"
            v-model="register.firstName"
          ></v-text-field>
          <v-text-field
            label="LastName"
            type="lastName"
            name="lastName"
            v-model="register.lastName"
          ></v-text-field>
          <v-text-field
            label="Address"
            type="address"
            name="address"
            v-model="register.address"
          ></v-text-field>
          <v-menu
            v-model="register.showPicker"
            :close-on-content-click="false"
            :nudge-right="0"
            transition="scale-transition"
            offset-y
            min-width="50px"
            max-width="280px"
            max-height="400px"
          >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="register.selectedDate"
              label="Birthday"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker        
            v-model="register.birthday" 
            @input="closeDateMenu">
          </v-date-picker>
          </v-menu>
          <v-text-field
            label="Phone"
            name="phone"
            id="phone"
            type="text" 
            @input="acceptNumber"
            v-model="register.phone"
          ></v-text-field>
          <!-- <VuePhoneNumberInput
          default-country-code="US"
          v-model="phone" /> -->
          <input
            type="checkbox"
            id="policy"
            name="policy"
            v-model="register.policy"
          />
          <b class="left">I agree to Term of Use and Cookie & Privacy Policy</b>
          <br>
          <input
            type="checkbox"
            id="subscribe"
            name="subscribe"
            v-model="register.subscribe"
          />
          <b class="left">I would like to receive newsletter for latest updates, offers and more</b>
          <br>
          </form>
          <!-- <section id="firebaseui-auth-container"></section> -->
          <br>
          <h4><u>Password Policy</u></h4>
          <p><span>&#10003;Contains a minimum of 8 characters</span></p>
          <p><span>&#10003;Only include upper, lower case or numbers</span></p>
          <!-- <v-checkbox
          hide-details
          :true-value="1"
          :false-value="0"
          :rules="[v => v > 0 || 'You must agree to continue!']"
          label="I agree to Influx's Term of Use and Cookie & Privacy Policy"
          class="align-center"
          /> -->
          <br>
          <div class= "error" v-html="error" />
          <br>
          <v-btn
            class="black--text"
            @click="signUp">
            Register
          </v-btn>
        </panel>
      </v-card>
    </v-col>
    </v-row>
  </v-container>
</v-app>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationService';
import { reactive } from 'vue';
// import * as moment from "moment"
// import 'vue-phone-number-input/dist/vue-phone-number-input.css'
export default {
  data () {
    return {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      visibility: 'password',
      error: null,
      showPicker: false,
      selectedDate: null,
      birthday:'',
      phone: '',
      subscribe: false,
      policy: false
    }
  },
  props: {
    placeholder: {type: String, default: ''},
    value: '',
    maxlength: {type: Number, default: 50},
    onlyunder: {type: Boolean, default: false}
  },
  /*setUp() {
    const register = reactive({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      visibility: 'password',
      error: null,
      showPicker: false,
      selectedDate: null,
      birthday:'',
      phone: '',
      subscribe: false,
      policy: false
    });

    function signUp() {
      try {
        const confirm = document.getElementById('policy')
         if(confirm.checked == false)
         {
         alert("Please agree to the policy to continue!")
         document.getElementbyId('policy').focus()
         return false
         }
        this.error = null
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          address: this.address,
          birthday: this.birthday,
          phone: this.phone,
          subscribe: this.subscribe
        })
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'registerConfirmation'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }

    return {
      register,
      signUp
    };
  },*/
  /*
  components: {
     VuePhoneNumberInput
  },
  */
  methods: {
    async register () {
      try {
        const confirm = document.getElementById('policy')
         if(confirm.checked == false)
         {
         alert("Please agree to the policy to continue!")
         document.getElementbyId('policy').focus()
         return false
         }
        this.error = null
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          address: this.address,
          birthday: this.birthday,
          phone: this.phone,
          subscribe: this.subscribe
        })
        // this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'registerConfirmation'
        })
        /*
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(response => {
          console.log("Success! ", response);
        })
        .catch(error => {
          console.log("Failed!", error);
        });
        */
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async switchVisibility () {
      const passwordField = document.querySelector('#password')
      if (passwordField.getAttribute('type') === 'password') { passwordField.setAttribute('type', 'text') } else { passwordField.setAttribute('type', 'password') }
    },
    async closeDateMenu () {
      this.showPicker = false
      // this.selectedDate= this.birthday ? moment(this.birthday).format('DD, MMMM YYYY') : ''
    },
    async acceptNumber () {
    	var x = this.phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
      this.phone = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '')
    }
  },
  /*
  mounted() {
        let ui = firebaseui.auth.AuthUI.getInstance()
        if (!ui) {
            ui = new firebaseui.auth.AuthUI(firebase.auth())
        }
        var uiConfig = {
            signInSuccessUrl: "/shops",
            signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID]
        };
        ui.start("#firebaseui-auth-container", uiConfig)
    }
    */
}
</script>

<style scoped>
h4 {
  color: rgb(0, 0, 0);
}
h6 {
  text-align: left;
  color: rgb(104, 0, 0);
}
p {
  color: rgb(85, 85, 85);
}
</style>