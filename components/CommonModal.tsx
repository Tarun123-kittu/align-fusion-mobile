import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

interface CommonModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CommonModal: React.FC<CommonModalProps> = ({ isVisible, onClose, children }) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#222" />
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    minWidth: 280,
    minHeight: 120,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    padding: 4,
  },
});

export default CommonModal; 