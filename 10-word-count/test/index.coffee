assert = require 'assert'
WordCounter = require '../lib'

helper = (input, expected, done) ->
  pass = false
  counter = new WordCounter()

  counter.on 'readable', ->
    return unless result = this.read()
    assert.deepEqual result, expected
    assert !pass, 'Are you sure everything works as expected?'
    pass = true

  counter.on 'end', ->
    if pass then return done()
    done new Error 'Looks like transform fn does not work'

  counter.write input
  counter.end()


describe '10-word-count', ->

  it 'should count a single word', (done) ->
    input = 'test'
    expected = words: 1, lines: 1
    helper input, expected, done

  it 'should count PascalCase as three words', (done) ->
    input = 'BrownFoxTest'
    expected = words: 3, lines: 1
    helper input, expected, done

  it 'should count word that starts with a number as a single word', (done) ->
    input = '5BrownFoxTest'
    expected = words: 1, lines: 1
    helper input, expected, done

  it 'is word doesnt start with a capital letter then it is not PascalCase', (done) ->
    input = 'brownFoxTest'
    expected = words: 1, lines: 1
    helper input, expected, done

  it 'should not count word with special character _', (done) ->
    input = 'special_test'
    expected = words: 0, lines: 1
    helper input, expected, done

  it 'should not count @$%sfs as a word', (done) ->
    input = 'My Test @$%sfs'
    expected = words: 2, lines: 1
    helper input, expected, done

  it 'count number of lines', (done) ->
    input = 'this is \n a lovely test'
    expected = words: 5, lines: 2
    helper input, expected, done

  it 'should count words in a phrase', (done) ->
    input = 'this is a basic test'
    expected = words: 5, lines: 1
    helper input, expected, done

  it 'should count quoted characters as a single word', (done) ->
    input = 'Expected to have seven words because "this is one word!"'
    expected = words: 7, lines: 1
    helper input, expected, done

