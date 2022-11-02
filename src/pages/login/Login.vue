<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/img/logo.png" />
        <span class="title">{{ systemName }}</span>
      </div>
      <div class="desc">雲端資產管理系統</div>
    </div>
    <div class="login">
      <a-form @submit="onSubmit" :form="form">
        <div>
          <a-alert
            type="error"
            :closable="true"
            v-if="error"
            :message="error"
            @close="onClose"
            showIcon
            style="margin-bottom: 24px"
          />
          <a-form-item>
            <a-input
              autocomplete="autocomplete"
              size="large"
              placeholder="panda"
              v-decorator="[
                'name',
                {
                  rules: [
                    {
                      required: true,
                      message: '帳號',
                      whitespace: true,
                    },
                  ],
                },
              ]"
            >
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              size="large"
              placeholder="panda"
              autocomplete="autocomplete"
              type="password"
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      required: true,
                      message: '密碼',
                      whitespace: true,
                    },
                  ],
                },
              ]"
            >
              <a-icon slot="prefix" type="lock" />
            </a-input>
          </a-form-item>
        </div>
        <div>
          <a-checkbox :checked="true">自動登入</a-checkbox>
          <!-- <a style="float: right">忘記密碼</a> -->
        </div>
        <a-form-item>
          <a-button
            :loading="logging"
            style="width: 100%; margin-top: 24px"
            size="large"
            htmlType="submit"
            type="primary"
            >登入</a-button
          >
        </a-form-item>
        <!-- <div>
          其他登录方式
          <a-icon class="icon" type="alipay-circle" />
          <a-icon class="icon" type="taobao-circle" />
          <a-icon class="icon" type="weibo-circle" />
          <router-link style="float: right" to="/dashboard/workplace"
            >注册账户</router-link
          >
        </div> -->
      </a-form>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from "@/layouts/CommonLayout";
import { login, getRoutesConfig } from "@/services/user";
import { setAuthorization } from "@/utils/request";
import { loadRoutes } from "@/utils/routerUtil";
import { mapMutations } from "vuex";

export default {
  name: "Login",
  components: { CommonLayout },
  data() {
    return {
      logging: false,
      error: "",
      form: this.$form.createForm(this),
    };
  },
  computed: {
    systemName() {
      return this.$store.state.setting.systemName;
    },
  },
  methods: {
    ...mapMutations("account", ["setUser", "setPermissions", "setRoles"]),
    onSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err) => {
        if (!err) {
          this.logging = true;
          const email = this.form.getFieldValue("name");
          const password = this.form.getFieldValue("password");
          try {
            // console.log(email, password);
            const { data } = await login(email, password);
            // console.log(data);
            // this.afterLogin(data);
          } catch (error) {
            console.log(error);
          }
          this.logging = false;
          // login(name, password).then(this.afterLogin);
        }
      });
    },
    async afterLogin(res) {
      this.logging = false;
      const loginRes = res;
      if (loginRes.code >= 0) {
        // const { data } = loginRes;
        console.log(loginRes.data);
        const { user, permissions, roles, token } = loginRes;
        this.setUser(user);
        this.setPermissions(user.permissions);
        this.setRoles(user.roles);
        await setAuthorization({
          token,
          // expireAt: new Date(loginRes.data.expireAt),
        });
        // 获取路由配置;
        const { data } = await getRoutesConfig();
        const routesConfig = data;
        loadRoutes(routesConfig);
        this.$router.push("/properties");
        this.$message.success("登入成功");
        // this.$message.success(loginRes.message, 3);
      } else {
        this.error = loginRes.message;
      }
    },
    onClose() {
      this.error = false;
    },
  },
};
</script>

<style lang="less" scoped>
.common-layout {
  .top {
    text-align: center;
    .header {
      height: 44px;
      line-height: 44px;
      a {
        text-decoration: none;
      }
      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
      }
      .title {
        font-size: 33px;
        color: @title-color;
        font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica,
          sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }
    .desc {
      font-size: 14px;
      color: @text-color-second;
      margin-top: 12px;
      margin-bottom: 40px;
    }
  }
  .login {
    width: 368px;
    margin: 0 auto;
    @media screen and (max-width: 576px) {
      width: 95%;
    }
    @media screen and (max-width: 320px) {
      .captcha-button {
        font-size: 14px;
      }
    }
    .icon {
      font-size: 24px;
      color: @text-color-second;
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: @primary-color;
      }
    }
  }
}
</style>
