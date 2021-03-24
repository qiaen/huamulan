<template>
  <div class="flex tabs shrink0">
    <!-- 主tab -->
    <div class="flex1 hideit">
      <el-tabs
        @tab-click="selectTab"
        @tab-remove="removeTab"
        v-model="currentTab"
        type="card"
        closable
      >
        <el-tab-pane
          :key="item.path"
          v-for="item in menuTabs"
          :label="item.label"
          :name="item.path"
        >
          <template #label>
            <span class="pointer center">
              <i :class="item.icon" class="label-icon fsize15"></i>
              {{ item.label }}
            </span>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 关闭所有 -->
    <div class="shrink0 close-btn">
      <el-dropdown>
        <span class="el-dropdown-link center pointer fcgreen">
          <i class="iconfont icon-zidongqingli"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="closeTabs('all')"
              >关闭所有</el-dropdown-item
            >
            <el-dropdown-item @click="closeTabs('others')"
              >关闭其他</el-dropdown-item
            >
            <el-dropdown-item @click="removeTab($route.path)"
              >关闭</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import {
  useRoute,
  onBeforeRouteLeave,
  useRouter,
  onBeforeRouteUpdate,
} from "vue-router";
export default {
  name: "tabs",
  setup() {
    let route = useRoute();
    let router = useRouter();
    let store = useStore();
    let menuTabs: any = computed(() => store.getters.menuTabs);
    function selectTab(tab: any) {
      router.push(tab.paneName);
    }
    function removeTab(path: string) {
      store
        .dispatch("layout/RemoveTab", { path })
        .then(() => {
          // 删除tab成功后，如果删除的是当前查看的，就回到首页
          if (path === route.path) {
            // 回到已打开tab的最后一个
            let len = menuTabs.length;
            if (len) {
              selectTab({ name: menuTabs[len - 1].path });
            } else {
              selectTab({ name: "/" });
            }
          }
        })
        .catch(() => {});
    }
    /**根据类型关闭tab */
    function closeTabs(type: any) {
      store.dispatch("layout/CloseTabs", type).then(() => {
        // 删除tab成功后，如果删除的是当前查看的，就回到首页
        if (type === "all") {
          selectTab({ name: "/" });
        }
      });
    }
    let currentTab = computed(() => store.getters.currentTab.path);
    function setCurrentTab() {
      store.dispatch("layout/SetCurrentTab", {
        label: route.name,
        path: route.path,
        icon: route.meta.icon,
      });
    }

    onBeforeRouteLeave((leaveGuard: NavigationGuard)=>{
    	console.log(leaveGuard)
    })
    onBeforeRouteUpdate((updateGuard: NavigationGuard) => {
      // setCurrentTab();
    });
    setCurrentTab();
    return {
      selectTab,
      currentTab,
      removeTab,
      menuTabs,
      closeTabs,
    };
  }
};
</script>
<style lang="less">
.tabs {
  .close-btn {
    .el-dropdown-link {
      width: 30px;
      height: 30px;
      background: #fff;
      &:hover {
        color: #2c5cc5;
      }
    }
    .iconfont {
      transform: rotate(135deg);
    }
  }
  padding: 10px 15px;
  height: 30px;
  .is-active {
    color: #189cfb;
    font-weight: bold;
    background: #f1f5f9;
    border-bottom-color: #f1f5f9 !important;
  }
  .el-tabs--card > .el-tabs__header {
    border-bottom: none;
    .el-tabs__nav {
      border: none;
      border-radius: 0;
    }
  }
  .el-tabs__nav-wrap {
    margin-bottom: 0;
    &.is-scrollable {
      padding: 0 28px 0 18px;
      .el-tabs__nav-next {
        padding-right: 12px;
      }
    }
  }
  .el-tabs__item {
    background: #fff;
    padding: 0 10px;
  }
  .el-tabs__item ~ .el-tabs__item {
    margin-left: 8px;
  }
  .label-icon {
    margin-right: 3px;
  }
  .el-tabs__item,
  .el-tabs__nav-next,
  .el-tabs__nav-prev {
    height: 30px;
    line-height: 30px;
  }
  .el-icon-close {
    margin-left: 0;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active.is-closable {
    padding-right: 10px;
    padding-left: 10px;
  }
  .el-tabs--top.el-tabs--card .el-tabs__item:nth-child(2) {
    padding-left: 10px;
  }
  .el-tabs--top.el-tabs--card .el-tabs__item:last-child {
    padding-right: 10px;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item {
    border-left: none;
    border-bottom: none;
  }
}
</style>