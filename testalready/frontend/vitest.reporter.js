export default {
  onSuiteStart(suite) {
    console.log(`🚀 Iniciando suíte: ${suite.name}`)
  },
  onSuiteEnd(suite) {
    console.log(`🏁 Finalizou suíte: ${suite.name}`)
  },
  onTestStart(test) {
    console.log(`🟡 Rodando teste: ${test.name}`)
  },
  onTestSuccess(test) {
    console.log(`✅ Teste passou: ${test.name}`)
  },
  onTestFail(test, error) {
    console.log(`❌ Teste falhou: ${test.name}`)
    console.error(error)
  }
}