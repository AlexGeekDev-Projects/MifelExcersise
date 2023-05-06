import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {styles} from '../theme/globaltheme';
import {useFetchData} from '../hooks/useFetchData';

export const Home = () => {
  const {
    data,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    totalPages,
    searchQuery,
    setSearchQuery,
    handleSearch,
    filteredData,
    setIsSearching,
    isSearching,
  } = useFetchData();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  const Separator = () => <View style={styles.separator} />;

  return (
    <View style={styles.globalMargin}>
      <Text style={styles.title}>Mifel ejercicio</Text>
      <TextInput
        style={{borderWidth: 1, padding: 10}}
        placeholder="Buscar"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <TouchableOpacity
        onPress={() => {
          setIsSearching(false), setSearchQuery('');
        }}
        style={styles.paginationButton}>
        <Text style={[styles.paginationButton]}>Limpiar</Text>
      </TouchableOpacity>

      <FlatList
        data={isSearching ? filteredData : data}
        ItemSeparatorComponent={Separator}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.listTitle}>{item.organization}</Text>
            <Text style={styles.detail}>{item.fact}</Text>
            <Text style={styles.detail}>{item.url}</Text>
          </View>
        )}
      />

      <View style={styles.paginationContainer}>
        <TouchableOpacity
          disabled={currentPage === 1}
          onPress={() => setCurrentPage(currentPage - 1)}
          style={styles.paginationButton}>
          <Text
            style={[
              styles.paginationButton,
              currentPage === 1 && styles.disabledButton,
            ]}>
            Anterior
          </Text>
        </TouchableOpacity>
        <Text style={styles.paginationText}>
          Página {currentPage} de {totalPages}
        </Text>
        <TouchableOpacity
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage(currentPage + 1)}
          style={styles.paginationButton}>
          <Text
            style={[
              styles.paginationButton,
              currentPage === totalPages && styles.disabledButton,
            ]}>
            Siguiente
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
