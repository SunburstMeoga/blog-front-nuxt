import Vue from 'vue'
import Web3 from 'web3'

import { contractConfig } from '../config/config'

Vue.prototype.Config = contractConfig
Vue.prototype.Web3 = new Web3(window.ethereum)
