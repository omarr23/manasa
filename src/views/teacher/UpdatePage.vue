<template>
    <div class="card">
        <div
            id="kt_customer_details_invoices_1"
            class="py-0 tab-pane fade active show card-body pt-0"
            role="tabpanel"
        >
            <DynamicForm
                v-if=" teacherItem"
                :formFields="formFields"
                :formData="formData"
                :initialData="teacherItem"
                :defaultFormFields="defaultFormFields"
                mode="edit"
                @checkPermissions="checkPermissions"
                @resetConstraints="resetConstraints(formFields)"
                @submit="handleSubmit"
            ></DynamicForm>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {  ref, onMounted } from "vue";
import DynamicForm from "@/components/Form/DynamicForm.vue";
import { formData, formFields, defaultFormFields } from "@/providers/teacher";
import { useTeacherStore } from '@/stores/teacher';
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { cloneDeep } from 'lodash'
import filters from '@/core/helpers/filters.ts'
import {
  getDefaultValues,
  setConstarinsOwnerAndBu,
  setConstrains,
  resetConstraints
} from '@/core/helpers/constrain'

    const teacherEntity = useTeacherStore();
    const teacherItem = ref();
    const router = useRouter();
    const id = ref(router.currentRoute.value.params.id);

     const handleSubmit = async () => {
      const data = cloneDeep(formData.value)
      const res = await teacherEntity.update(id.value.toString(), data)
      if (res) {
        Swal.fire({
          text: `${filters.ConvertCamelToTitleName("teacher")} Created Successfully`,
          icon: 'success',
          buttonsStyling: false,
          confirmButtonText: 'Ok',
          heightAuto: false,
          customClass: { confirmButton: 'btn fw-semobold btn-light-primary' }
        }).then(() => {
          router.push(`/teacher-view/${res.id}`)
        })
      }
    }
    const checkPermissions = (field) => {
      setConstrains(formFields, field)
    }
    onMounted(async () => {
      teacherItem.value = await teacherEntity.fetchItemAsync(id.value)
      setConstarinsOwnerAndBu(formFields, formData,'teacher_assign_ownership')
      getDefaultValues(formData, defaultFormFields,'teacher_assign_ownership')
    });
</script>
