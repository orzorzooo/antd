<template>
  <div>
    <h1>{{ edit ? "更新" : "新建" }}使用者</h1>
    <a-form-model
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 16 }"
      ref="form"
      :rules="rules"
      :model="form"
    >
      <a-form-model-item label="角色">
        <a-select :defaultValue="1" v-model="form.role_id">
          <a-select-option
            v-for="(item, index) in roles"
            :key="index"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="名稱" prop="name" has-feedback>
        <a-input v-model="form.name"></a-input>
      </a-form-model-item>

      <a-form-model-item label="email" prop="email">
        <a-input v-model="form.email" autocomplete="off" type="email"></a-input>
      </a-form-model-item>

      <a-form-model-item label="密碼" prop="password" has-feedback>
        <a-input
          type="password"
          v-model="form.password"
          autocomplete="off"
        ></a-input>
      </a-form-model-item>

      <a-form-model-item label="密碼確認" prop="checkPass" has-feedback>
        <a-input
          type="password"
          v-model="form.checkPass"
          autocomplete="off"
        ></a-input>
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submit"> 儲存 </a-button>
        <a-button style="margin-left: 10px" @click="$router.go(-1)">
          取消
        </a-button>
      </a-form-model-item>

      <a-divider></a-divider>
      <a-form-model-item label="危險動作" v-if="edit">
        <a-collapse>
          <a-collapse-panel header="刪除">
            <a-popconfirm
              title="確定刪除?"
              ok-text="確定"
              cancel-text="取消"
              @confirm="onDelete"
              class="red"
            >
              <a style="color: red">刪除</a>
            </a-popconfirm>
          </a-collapse-panel>
        </a-collapse>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import { create, findOne, update, remove } from "@/api/user";
import { findAll as findAllRoles } from "@/api/role";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("必填項目"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("請再次輸入密碼"));
      } else if (value !== this.form.password) {
        callback(new Error("密碼不符"));
      } else {
        callback();
      }
    };
    return {
      edit: false,
      roles: [],
      form: {
        name: "",
        email: "",
        password: "",
        checkPass: "",
        role_id: 1,
      },
      rules: {
        name: [{ required: true, message: "必填項目", trigger: "blur" }],
        email: [
          {
            message: "email格式不符",
            trigger: "change",
            required: true,
            pattern:
              /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
          },
        ],
        password: [
          { required: true, validator: validatePass, trigger: "change" },
        ],
        checkPass: [
          { validator: validatePass2, trigger: "change", required: true },
        ],
      },
    };
  },
  computed: {
    // ...mapGetters("company", ["company", "form"]),
  },
  methods: {
    // ...mapMutations("company", ["setCompany", "clearCompany"]),
    async submit() {
      const valid = await this.$refs.form.validate().catch((err) => {
        return err;
      });
      if (!valid) return;
      const { data } = this.edit
        ? await update(this.form.id, this.form)
        : await create(this.form);
      console.log("更新", data);
      if (data) this.$message.success("更新成功");

      this.$router.push({ name: "使用者管理" });
    },
    async onDelete() {
      const { data } = await remove(this.form.id);
      if (data) this.$message.success("刪除成功");
      this.$router.push({ name: "使用者管理" });
    },
  },
  async created() {
    const { data } = await findAllRoles();
    this.roles = data;
    console.log(this.roles);
    if (this.$route.params.id) {
      this.edit = true;
      const { data } = await findOne(this.$route.params.id);
      this.form = data;
      console.log(data);
    }
  },
};
</script>
<style scoped>
.ant-input-number {
  width: 100%;
}
</style>
