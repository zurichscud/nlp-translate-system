<template>
  <div>
    <el-container>
      <el-header>
        <div class="header">

          <span class="text"><i class="iconfont icon-ziranyuyanchuli" style="font-size: 30px"></i> 自然语言处理:翻译与摘要系统</span>
        </div>
      </el-header>
      <el-main class="res-text">
        <div style="margin: 50px 0">

        </div>
        <el-row>
          <el-col :span="16">
            <div style="margin: 50px"></div>
          </el-col>
          <el-col span="6">
            <el-radio-group v-model="model">
              <el-radio-button :label="1"><i class="el-icon-caret-top" ></i>&nbsp;先翻译再摘录</el-radio-button>
              <el-radio-button :label="2"><i class="el-icon-caret-bottom"></i>&nbsp;先摘录再翻译</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <div style="margin: 40px 0"></div>

        <el-row>
          <el-col :span="12">
            <el-empty description="点击提交可查看结果"
                      v-if="status===0"
            ></el-empty>
          </el-col>
          <el-col :span="12">
            <div v-if="status===1" class="res-text" v-loading="status===1">
              <div>加载中</div>
            </div>
          </el-col>
          <el-col :span="12">
            <div v-if="status===2" class="res-text">
              <span v-for="(item,index) in res" :key="index">{{ item }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <el-form>
              <el-form-item label="" prop="desc">
                <el-input
                    type="textarea"
                    v-model="text"
                    :required="true"
                    placeholder="请输入内容"
                    maxlength="200"
                    show-word-limit
                    class="input"
                    resize="none"
                    :rows="10"

                ></el-input>
              </el-form-item>

              <el-form-item style="text-align: center">
                <el-button type="danger" @click="submit(text)"><i class="el-icon-s-promotion"></i> &nbsp;提交
                </el-button>
                <el-button @click="reset"><i class="el-icon-delete-solid"></i>&nbsp;重置</el-button>
              </el-form-item>

            </el-form>
          </el-col>

        </el-row>

      </el-main>
      <el-footer>
      </el-footer>
    </el-container>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <span>不能输入空白</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="danger" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      text: '',
      model: 1,
      res: '',
      error: '',
      status:0,
      dialogVisible:false
    }
  },

  methods: {
    submit(text) {

      if (text.length !== 0 && this.model === 1) {
        this.status=1
        axios.post("http://localhost:8080/nlp/translate", {text})
            .then(res => {
              this.res = res.data;
              this.status=2

            })
            .catch(error => {
              this.error = error;
            })
      } else if (text.length !== 0 && this.model === 2) {
        this.status=1
        axios.post("http://localhost:8080/nlp/summary", {text})
            .then(res => {
              this.res = res.data;
              this.status=2
            })
            .catch(error => {
              this.error = error;
            })
      }else {
        this.dialogVisible=true
      }
      console.log(this.error)
      console.log(text)
      console.log(text.length!== '')
      console.log(this.model)


    },
    reset() {
      this.text = ''
      this.res = ''
    },
    handleClose() {
      this.$confirm('确认关闭？')
    }
  },
}
</script>

<style scoped>
.header {
  height: 80px;
  width: 100%;
  background-color: deeppink;
}

.text {
  text-align: center;
  color: white;
  font-size: 30px;
  font-family: "苹", "霞鹜文楷 Light", serif;
  position: absolute;
  top: 20px;
  left: 40px;

}

.res-text {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}


</style>