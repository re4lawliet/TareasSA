
db.createCollection('notas')
db.notas.insertMany([
  {
    carnet: 201314646,
    nombre: 'Carlos Monterroso',
    año: '2015',
    semestre: 'Primero',
    curso: 'Archivos',
    nota: 61
  },
  {
    carnet: 201314646,
    nombre: 'Carlos Monterroso',
    año: '2015',
    semestre: 'Primero',
    curso: 'Compi1',
    nota: 90
  },
  {
    carnet: 201314646,
    nombre: 'Carlos Monterroso',
    año: '2017',
    semestre: 'Primero',
    curso: 'Compi2',
    nota: 99
  },
  {
    carnet: 201314646,
    nombre: 'Carlos Monterroso',
    año: '2014',
    semestre: 'Primero',
    curso: 'Estructuras',
    nota: 100
  },
  {
    carnet: 201314646,
    nombre: 'Carlos Monterroso',
    año: '2018',
    semestre: 'Primero',
    curso: 'Gerenciales',
    nota: 70
  }
])