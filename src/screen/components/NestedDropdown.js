import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const NestedDropdown = ({
  data,
  placeholder = 'Select...',
  subPlaceholder = 'Select sub...',
  onSelect,
}) => {
  const [selectedParent, setSelectedParent] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [openParent, setOpenParent] = useState(false);
  const [openChild, setOpenChild] = useState(false);

  const handleParentSelect = item => {
    setSelectedParent(item);
    setSelectedChild(null);
    setOpenParent(false);
    setOpenChild(false);
  };

  const handleChildSelect = item => {
    setSelectedChild(item);
    setOpenChild(false);
    onSelect?.({ parent: selectedParent, child: item });
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setOpenParent(!openParent)}
      >
        <Text style={selectedParent ? styles.selected : styles.placeholder}>
          {selectedParent?.label || placeholder}
        </Text>
        <Text style={styles.arrow}>{openParent ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {openParent && (
        <View style={styles.dropdown}>
          <ScrollView nestedScrollEnabled>
            {data.map(item => (
              <TouchableOpacity
                key={item.value}
                style={styles.option}
                onPress={() => handleParentSelect(item)}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {selectedParent && (
        <>
          <TouchableOpacity
            style={[styles.selector, { marginTop: 10 }]}
            onPress={() => setOpenChild(!openChild)}
          >
            <Text style={selectedChild ? styles.selected : styles.placeholder}>
              {selectedChild?.label || subPlaceholder}
            </Text>
            <Text style={styles.arrow}>{openChild ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {openChild && (
            <View style={styles.dropdown}>
              <ScrollView nestedScrollEnabled>
                {selectedParent.children?.map(item => (
                  <TouchableOpacity
                    key={item.value}
                    style={styles.option}
                    onPress={() => handleChildSelect(item)}
                  >
                    <Text style={styles.optionText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  placeholder: { color: '#aaa', fontSize: 14 },
  selected: { color: '#000', fontSize: 14 },
  arrow: { color: '#888', fontSize: 12 },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    maxHeight: 180,
    marginTop: 4,
  },
  option: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: { fontSize: 14, color: '#333' },
});

export default NestedDropdown;
