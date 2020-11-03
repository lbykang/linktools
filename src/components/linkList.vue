<template>
  <div class="fillcontain">
    <head-top></head-top>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column prop="linkName" label="名称" width="120">
      </el-table-column>
      <el-table-column
        prop="linkUrl"
        label="url"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="typeName"
        label="链接类型"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="state" label="图标" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-image
            :lazy="true"
            style="width: 50px; height: 40px; margin-bottom: -6px"
            :src="scope.row.linkImage"
            :preview-src-list="images"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            @click="showLinkInfo(scope.row.id)"
            type="text"
            size="small"
            >查看</el-button
          >
          <el-button type="text" size="small" @click="getLinkInfo(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="delete scope.row.id"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[15, 20, 30]"
      :page-size="15"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <el-dialog title="查看" :visible.sync="dialogFormVisibleCk">
      <el-form :model="linkInfo">
        <el-form-item label="链接名称" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="linkInfo.linkName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="URL" :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="linkInfo.linkUrl"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="显示顺序" :label-width="formLabelWidth">
          <el-input-number
            v-model="linkInfo.linkOrder"
            :min="0"
            label="显示顺序"
            disabled
          ></el-input-number>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select disabled v-model="linkInfo.state" placeholder="状态">
            <el-option label="有效" value="1"></el-option>
            <el-option label="无效" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="链接类型" :label-width="formLabelWidth">
          <el-input disabled v-model="linkInfo.typeName"></el-input>
        </el-form-item>
        <el-form-item label="链接图标" :label-width="formLabelWidth">
          <el-image
            lazy
            fit
            style="width: 150px; height: 140px; margin-bottom: -6px"
            :src="linkInfo.linkImage"
            alt=""
            :preview-src-list="linkInfoImage"
          />
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="linkInfo">
        <el-form-item label="链接名称" :label-width="formLabelWidth">
          <el-input v-model="linkInfo.linkName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="URL" :label-width="formLabelWidth">
          <el-input v-model="linkInfo.linkUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序" :label-width="formLabelWidth">
          <el-input v-model="linkInfo.linkOrder" label="显示顺序"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="linkInfo.state" placeholder="状态">
            <el-option label="有效" value="1"></el-option>
            <el-option label="无效" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="链接类型" :label-width="formLabelWidth">
          <el-select v-model="linkInfo.linkType" placeholder="请选择链接类型">
            <el-option label="类型1" value="shanghai"></el-option>
            <el-option label="类型2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="链接图标" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import headTop from "../view/headTop";
import axios from "axios";

export default {
  data() {
    return {
      tableData: [],
      currentRow: null,
      offset: 0, //当前也
      limit: 20, //
      count: 0,
      total: 60, //总条数
      currentPage: 1,
      isChoose: false,
      countData: [],
      images: [],
      linkInfoImage: [],
      linkInfo: "",
      currentPage4: 4,
      dialogFormVisible: false,
      dialogFormVisibleCk: false,
      imageUrl:'',
      link: {
        name: "",
        region: "",
        order: 0,
        state: "",
        type: "",
        pcFile: "",
      },
      formLabelWidth: "120px",
    };
  },
  components: {
    headTop,
  },
  created() {
    this.getLinks();
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleChange(value) {
      console.log(value);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    delete(id) {
      console.log(id);
    },
    showLinkInfo(id) {
      this.dialogFormVisibleCk = true;
      axios.get("/api/link/getLinkById?id=" + id).then((res) => {
        this.linkInfo = res.data;
        console.log(res.data);
        this.linkInfoImage.push(res.data.linkImage);
      });
    },
    getLinkInfo(id) {
      this.dialogFormVisible = true;
      axios.get("/api/link/getLinkById?id=" + id).then((res) => {
        this.linkInfo = res.data;
        console.log(res.data);
      });
    },
    photoList() {
      let final = [];
      for (let photo of this.photos) {
        final.push(photo.src);
      }
      let nowIndex = final.findIndex((photo) => photo === this.now);
      if (nowIndex > -1) {
        let start = final.slice(0, nowIndex);
        let end = final.slice(nowIndex);
        final = [...end, ...start];
      }
      return final;
    },
    handleSelectionChange() {},
    handleClick(row) {
      console.log(row);
    },
    imgScc: function () {
      this.isChoose = !this.isChoose;
    },
    async getLinks() {
      axios.get("/api/link/getLink").then((res) => {
        var _this = this;
        console.log(res);
        res.data.forEach((item) => {
          var linkList = item.linkList;
          linkList.forEach((link) => {
            var table = {};
            table.typeName = item.typeName;
            table.id = link.id;
            table.linkName = link.linkName;
            table.linkUrl = link.linkUrl;
            table.linkImage = link.linkImage;
            table.linkType = link.linkType;
            table.state = link.state;
            _this.images.push(link.linkImage);
            _this.tableData.push(table);
          });
        });
      });
    },
  },
};
</script>

<style lang="less">
@import "../assets/css/mixin";
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-pagination {
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;
  height: 10%;
  float: right;
  margin: 20px;
}
td.el-table_1_column_6 {
  padding: 0px;
}
.table_container {
  padding: 20px;
}
.vueBox {
  text-align: center;
  margin-left: 300px;
  position: relative;
}

img {
  transform: scale(1); /*图片原始大小1倍*/
  transition: all ease 0.5s;
} /*图片放大所用时间*/

img.active {
  transform: scale(4); /*图片需要放大3倍*/
  position: fixed; /*是相对于前面的容器定位的，此处要放大的图片，不能使用position：relative；以及float，否则会导致z-index无效*/
  z-index: 100;
}
</style>
