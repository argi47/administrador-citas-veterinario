import React, { useState } from 'react'
import {
  SafeAreaView,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  FlatList,
  Alert
} from 'react-native'
import Formulario from './src/components/Formulario'
import Paciente from './src/components/Paciente'
import InformacionPaciente from './src/components/InformacionPaciente'

const App = () => {

  // Los hooks se colocan an la parte superior. Se declaran en la parte más superior del componentes (en este caso App)
  const [modalVisible, setModalVisible] = useState(false)
  const [pacientes, setPacientes] = useState<any[]>([])
  const [paciente, setPaciente] = useState({})
  const [modalPaciente, setModalPaciente] = useState(false)

  const pacienteEditar = (id: any) => {
    const pacienteEditar = pacientes.filter(item => item.id === id)

    setPaciente(pacienteEditar[0])
  }

  const pacienteEliminar = (id: any) => {
    Alert.alert(
      '¿Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        { text: 'Cancelar' },
        {
          text: 'Sí, Eliminar', onPress: () => {

            const pacientesActualizados = pacientes.filter(item => item.id !== id)
            setPacientes(pacientesActualizados)

          }
        }
      ]
    )
  }

  const cerrarModal = () => {
    setModalVisible(false)
  }

  return (
    // SafeAreaView > Deja un espacio en la parte superior en dispositivos iOS ya que la cámara lo taparía
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Administrador de Citas {''}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>

      <Pressable
        style={styles.btnNuevaCita}
        onPress={() => { setModalVisible(true) }}
      >
        <Text style={styles.btnTextoNuevaCita}>
          Nueva Cita
        </Text>
      </Pressable>

      {pacientes.length === 0 ?
        <Text style={styles.noPacientes}>No hay pacientes aún</Text>
        :
        <FlatList
          style={styles.listado}
          data={pacientes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <Paciente
                item={item}
                setModalVisible={setModalVisible}
                setPaciente={setPaciente}
                pacienteEditar={pacienteEditar}
                pacienteEliminar={pacienteEliminar}
                setModalPaciente={setModalPaciente}
              />
            )
          }}
        />
      }

      {modalVisible &&
        <Formulario
          modalVisible={modalVisible}
          cerrarModal={cerrarModal}
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
      }

      <Modal
        visible={modalPaciente}
        animationType='fade'
      >
        <InformacionPaciente
          paciente={paciente}
          setPaciente={setPaciente}
          setModalPaciente={setModalPaciente}
        />
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1 //  Toma todo el alto de la pantalla (toda la vertical)
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600'
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9'
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 20,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30
  }
})

export default App