import React, { useState, useEffect } from 'react'
import {
  Text,
  Modal,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Alert
} from 'react-native'
import DatePicker from 'react-native-date-picker'

const Formulario = (props) => {
  const {
    modalVisible,
    cerrarModal,
    pacientes, 
    setPacientes, 
    paciente: pacienteObj, 
    setPaciente: setPacienteApp
  } = props

  const [id, setId] = useState('')
  const [paciente, setPaciente] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [fecha, setFecha] = useState(new Date())
  const [sintomas, setSintomas] = useState('')

  const handleCita = () => {

    // Validar
    if([paciente, propietario, email, fecha, sintomas].includes('')) {

      Alert.alert(
        'Error',
        'Todos los campos son obligatorios'
      )

      return
    }

    const nuevoPaciente = {
      paciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas
    }

    // Revisar si es un registro nuevo o edición
    if (id) {

      // Editando

      nuevoPaciente.id = id

      const pacientesActualizados = pacientes.map(item => item.id === nuevoPaciente.id ? nuevoPaciente : item)

      setPacientes(pacientesActualizados)
      setPacienteApp({})
    }
    else {

      // Nuevo Registro

      nuevoPaciente.id = Date.now()
      setPacientes([...pacientes, nuevoPaciente])
    }
    
    cerrarModal()

    setId('')
    setPaciente('')
    setPropietario('')
    setEmail('')
    setTelefono('')
    setFecha(new Date())
    setSintomas('')
  }

  useEffect(() => {
    if (Object.keys(pacienteObj).length > 0) {
      setId(pacienteObj.id)
      setPaciente(pacienteObj.paciente)
      setPropietario(pacienteObj.propietario)
      setEmail(pacienteObj.email)
      setTelefono(pacienteObj.telefono)
      setFecha(pacienteObj.fecha)
      setSintomas(pacienteObj.sintomas)
    }
  }, [pacienteObj])

  return (
    <Modal
      animationType='slide'
      visible={modalVisible}
    >
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>
            {pacienteObj.id ? 'Editar' : 'Nueva'} {''}
              <Text style={styles.tituloBold}>Cita</Text>
          </Text>

          <Pressable 
            style={styles.btnCancelar} 
            onPress={() => {
              cerrarModal()
              setPacienteApp({})
              setId('')
              setPaciente('')
              setPropietario('')
              setEmail('')
              setTelefono('')
              setFecha(new Date())
              setSintomas('')
            }}
          >
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>  
          </Pressable>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder='Nombre Paciente'
              placeholderTextColor={'#666'}
              value={paciente}
              onChangeText={setPaciente}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder='Nombre Propietario'
              placeholderTextColor={'#666'}
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder='Email Propietario'
              placeholderTextColor={'#666'}
              keyboardType='email-address'
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Teléfono Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder='Teléfono Propietario'
              placeholderTextColor={'#666'}
              keyboardType='phone-pad'
              value={telefono}
              onChangeText={setTelefono}
              maxLength={9}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha Alta</Text>

            <View style={styles.fechaContenedor}>
              <DatePicker 
                date={fecha}
                locale='es'
                onDateChange={(date) => setFecha(date)}
              />
            </View>     
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Síntomas</Text>
            <TextInput
              style={[styles.input, styles.sintomasInput]}
              placeholder='Síntomas paciente'
              placeholderTextColor={'#666'}
              value={sintomas}
              onChangeText={setSintomas}
              multiline={true}
              // numberOfLines={4}
            />
          </View>

          <Pressable style={styles.btnNuevaCita} onPress={handleCita}>
            <Text style={styles.btnNuevaCitaTexto}>{pacienteObj.id ? 'Editar' : 'Agregar'} Paciente</Text>  
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#6D28D9',
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#fff'
  },
  tituloBold: {
    fontWeight: '900'
  },
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: '#5827A4',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10
  },
  btnCancelarTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase'
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600'
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10
  },
  sintomasInput: {
    height: 100
  },
  fechaContenedor: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: '#F59E0B',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10
  },
  btnNuevaCitaTexto: {
    color: '#5827A4',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase'
  }
})

export default Formulario