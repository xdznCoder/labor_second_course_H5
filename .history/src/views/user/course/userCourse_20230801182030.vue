<template>
  <van-config-provider :theme-vars="themeVars">
    <div ref="header">
      <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
        <template #title><span style="color: #e1562a">我的课程</span></template>
      </van-nav-bar>
      <van-dropdown-menu active-color="#e1562a">
        <van-dropdown-item v-model="state" :options="option" />
      </van-dropdown-menu>
    </div>
  </van-config-provider>
  <course-page-skeleton :skeLoad="listLoading" v-if="listLoading"></course-page-skeleton>
  <div class="container" :style="{ height: `calc(100vh - var(--van-tabbar-bar) -  ${headerHeight}px - 20px)` }" v-else>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="course in courseList" :key="course.id">
        <course-preview :course="course"></course-preview>
      </van-cell>
      <van-cell v-for="course in courseList" :key="course.id">
        <course-preview :course="course"></course-preview>
      </van-cell>
      <van-cell v-for="course in courseList" :key="course.id">
        <course-preview :course="course"></course-preview>
      </van-cell>
      <van-cell v-for="course in courseList" :key="course.id">
        <course-preview :course="course"></course-preview>
      </van-cell>
    </van-list>
  </div>
</template>

<script setup>
import courseApi from "@/api/courses/courses.ts";
import CoursePreview from "@/components/coursePreview/coursePreview.vue";
import CoursePageSkeleton from "@/components/coursePageSkeleton/coursePageSkeleton.vue";
import { onMounted, ref } from "vue";
const themeVars = reactive({
  navBarTextColor: "#e1562a",
  navBarIconColor: "#e1562a",
});
const courseList = ref([]);
const router = useRouter();
const state = ref(0);
const listLoading = ref(false);
const header = ref()
const headerHeight = ref(0)
onMounted(() => {
  headerHeight.value = header.value.offsetHeight
})
watch(state, () => {
  onLoad();
});
const option = [
  { text: "全部", value: null },
  { text: "报名中", value: 2 },
  { text: '审核中', value: -1 },
  { text: "进行中", value: 3 },
  { text: "已结束", value: 4 },
];
const loading = ref(false);
const finished = ref(false);

const onLoad = () => {
  listLoading.value = true;
  courseApi
    .getCourses({
      userType: 1,
      pageSize: 10,
      state: state.value,
    })
    .then((res) => {
      courseList.value = res.data.list;
      loading.value = true;
      finished.value = true;
      listLoading.value = false;
    });
};
const onClickLeft = () => {
  router.back();
};
</script>

<style scoped>
.course-list {
  overflow-y: auto;
}

.container {
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
