import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '../components/WelcomePage.vue'
import SurveyForm from '../components/SurveyForm.vue'
import SurveyList from '../components/SurveyList.vue'

const routes = [
  { path: '/', component: WelcomePage },
  { path: '/survey-form', component: SurveyForm },
  { path: '/survey-form/:id', component: SurveyForm },
  { path: '/surveys', component: SurveyList }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
