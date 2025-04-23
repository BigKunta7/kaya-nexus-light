import { sendMessage, addComment, startCollabSession } from './index';

describe('Collaboration module', () => {
  it('sendMessage renvoie un objet message', () => {
    const result = sendMessage('user1', 'Hello!');
    expect(result).toHaveProperty('userId', 'user1');
    expect(result).toHaveProperty('message', 'Hello!');
  });
  it('addComment renvoie un objet commentaire', () => {
    const result = addComment('doc1', 'Super doc');
    expect(result).toHaveProperty('docId', 'doc1');
    expect(result).toHaveProperty('comment', 'Super doc');
  });
  it('startCollabSession renvoie une session', () => {
    const result = startCollabSession('doc2', ['user1', 'user2']);
    expect(result).toHaveProperty('docId', 'doc2');
    expect(result.participants).toContain('user1');
  });
});
