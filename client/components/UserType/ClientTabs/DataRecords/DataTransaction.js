import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
 
export default class ExampleFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Time', 'Current Location', 'Destination', 'Driver'],
      tableData: [
        ['11/21/18', 'Mt Zion', 'Dita', '1'],
        ['10/26/18', 'Balibago', 'Carlton', '2'],
        ['11/21/18', 'Carlton', 'Complex', '3'],
        ['11/21/18', 'Cabuyao', 'Carlton', '4'],
      ]
    }
  }
 
  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }
 
  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>View</Text>
        </View>
      </TouchableOpacity>
    );
 
    return (
      <View style={styles.container}>
      <Text style={styles.textHeader}>Transactions History</Text>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          {
            state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#F2F1F1' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  textHeader: { flex: 1, justifyContent: 'center', fontSize: 16},
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});