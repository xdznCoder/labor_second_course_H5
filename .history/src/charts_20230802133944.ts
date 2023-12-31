import * as echarts from 'echarts/core';
// 图表组件, 这里暂时
import { BarChart, LineChart, CategoryChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    // 数据集组件
    DatasetComponent,
    // 内置数据转换器组件
    TransformComponent
} from 'echarts/components';
//引入标签布局和通用过渡动画特性。
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器。
import { CanvasRenderer } from 'echarts/renderers';

import type {
    // 系列类型的定义后缀都为 SeriesOption
    BarSeriesOption,
    LineSeriesOption
} from 'echarts/charts';

import type {
    // 组件类型的定义后缀都为 ComponentOption
    TitleComponentOption,
    TooltipComponentOption,
    GridComponentOption,
    DatasetComponentOption
} from 'echarts/components';
import type {
    ComposeOption,
} from 'echarts/core';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
    | BarSeriesOption
    | LineSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
>;

/** 
    注册必须的组件，包括标题、提示框、网格、数据集、数据转换器，
    以及柱状图、折线图、标签布局、通用过渡动画和 Canvas 渲染器。
*/
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    BarChart,
    LineChart,
    CategoryChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
]);
// 导出
export default echarts;