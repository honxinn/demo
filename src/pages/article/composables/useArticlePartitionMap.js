import {
  computed
} from 'vue'

export function useArticlePartitionMap(articlePartition) {
  // const data = []
  //   for (let i = 1; i <= 15; i++) {
  //     data.push({
  //       value: i,
  //       desc: `Option ${i}`,
  //       label: `Option ${i}`,
  //       disabled: i % 4 === 0,
  //     })
  //   }
  const getArticlePartitionFilter = computed(() => {
    // return data
    console.log(articlePartition)
    return articlePartition.map(item => {
      return {
        value: item.id,
        desc: item.partition_name,
        label: item.partition_name
      }
    })
  })

  return {
    getArticlePartitionFilter
  }
}