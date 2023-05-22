<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 h-screen">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm space-y-6"
      >
        <el-form-item label="Email address" prop="email" class="block text-sm font-medium leading-6 text-gray-900">
          <el-input v-model="ruleForm.email" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Password" prop="pass" class="block text-sm font-medium leading-6 text-gray-900">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Confirm" prop="checkPass">
          <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >Submit</el-button
          >
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
      <p class="mt-10 text-center text-sm text-gray-500">
        已有账户
        <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">请登录</a>
      </p>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  pass: '',
  checkPass: '',
  email: '',
})
  const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}
const checemail = (rule: any, value: any, callback: any)=>{
  if(!value){
    callback(new Error('Please input the email again'))
  }
  setTimeout(() => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
      callback(new Error('This field must be a valid email'))
    }else {
      callback()
    }
  }, 1000)
}
const rules = reactive<FormRules>({
  pass: [{ validator: validatePass, trigger: 'blur' },
    { min: 6, max: 12, message: 'Length should be 6 to 12', trigger: 'blur' },
  ],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  email: [{ validator: checemail, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log(ruleForm)
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped>
</style>
